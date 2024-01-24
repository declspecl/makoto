#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

use state::{config::MakotoConfig, data::MakotoData, MakotoState};
use error::{MakotoError, MakotoResult};

use crate::state::MakotoStateWrapper;

pub mod model;
pub mod state;
pub mod error;
pub mod commands;

use commands::*;

fn main() -> MakotoResult<()>
{
    let app_context = tauri::generate_context!();

    // if no errors occur, deserializes `MakotoData` from data.json
    // if errors do occur, is set to `MakotoData::default()` and adds the error to `data.startup_error_log`
    let mut data: MakotoData = match tauri::api::path::app_data_dir(app_context.config())
    {
        Some(data_parent_dir) => {
            let data_file_path = data_parent_dir.join("data.json");

            match MakotoData::try_deserialize_from_data(&data_file_path)
            {
                Ok(data) => data,
                Err(err) => {
                    let mut data = MakotoData::default();

                    data.startup_error_log.push(err.to_string());

                    data
                }
            }
        },
        None => {
            let err = MakotoError::FailedToGetPath("app data".into());

            let mut data = MakotoData::default();

            data.startup_error_log.push(err.to_string());

            data
        }
    };

    // if no errors occur, deserializes `MakotoConfig` from config.json.
    // if errors do occur, is set to `MakotoConfig::default()` and adds the error to `data.startup_error_log`
    let config: MakotoConfig = match tauri::api::path::app_config_dir(app_context.config())
    {
        Some(config_parent_dir) => {
            let config_file_path = config_parent_dir.join("config.yaml");

            match MakotoConfig::try_deserialize_from_config(&config_file_path)
            {
                Ok(config) => config,
                Err(err) => {
                    let config = MakotoConfig::default();

                    data.startup_error_log.push(err.to_string());

                    config
                }
            }
        },
        None => {
            let err = MakotoError::FailedToGetPath("app config".into());

            let config = MakotoConfig::default();

            data.startup_error_log.push(err.to_string());

            config
        }
    };

    // cloning before the `setup` closure so i can reference the window config when creating the main window
    let window_properties = config.window_properties.clone();

    // TODO: right now, the frontend won't know if there was an error while trying to deserialize the config or data

    tauri::Builder::default()
        .setup(move |app| -> Result<(), Box<dyn std::error::Error>> {
            // defining main window
            let mut main_window = tauri::WindowBuilder::new(app, "MainWindow", tauri::WindowUrl::App("/index.html".into()))
                .resizable(true)
                .title(window_properties.title)
                .maximized(window_properties.maximized)
                .fullscreen(window_properties.fullscreen);

            // centering window
            if window_properties.centered
            {
                main_window = main_window.center();
            }
            // if user does not want it to start centered, check if they specified a position
            else if let Some(position) = window_properties.initial_position
            {
                main_window = main_window.position(position.x, position.y);
            }

            // min size
            if let Some(size) = window_properties.initial_inner_size
            {
                main_window = main_window.inner_size(size.width, size.height);
            }

            // initial size
            if let Some(size) = window_properties.minimum_inner_size
            {
                main_window = main_window.min_inner_size(size.width, size.height);
            }

            // max size
            if let Some(size) = window_properties.maximum_inner_size
            {
                main_window = main_window.max_inner_size(size.width, size.height);
            }

            main_window.build()?;

            return Ok(());
        })
        .manage(MakotoStateWrapper(Arc::new(Mutex::new(MakotoState { config, data }))))
        .invoke_handler(tauri::generate_handler![
            update_state_config,
            update_state_data,
            get_state,
            get_startup_error_log
        ])
        .run(app_context)
        .expect("error while running tauri application");

    return Ok(());
}
