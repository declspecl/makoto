#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{path::PathBuf, sync::{Arc, Mutex}};

use state::{config::MakotoConfig, data::MakotoData, MakotoState};
use error::{MakotoError, MakotoResult};

use crate::state::MakotoStateWrapper;

pub mod model;
pub mod state;
pub mod error;
pub mod commands;

use commands::{try_deserialize_from_config_file, try_serialize_default_config, try_serialize_default_data, try_deserialize_from_data_file};

fn main() -> MakotoResult<()>
{
    let app_context = tauri::generate_context!();

    let config_file_path: PathBuf = tauri::api::path::app_config_dir(app_context.config())
        .ok_or(MakotoError::FailedToGetPath("app config".into()))?
        .join("config.yaml");

    let data_file_path: PathBuf = tauri::api::path::app_data_dir(app_context.config())
        .ok_or(MakotoError::FailedToGetPath("app data".into()))?
        .join("data.json");

    let config = MakotoConfig::try_deserialize_from_config(&config_file_path)?;
    let data = MakotoData::try_deserialize_from_data(&data_file_path)?;

    // cloning before the `setup` closure so i can reference the window config when creating the main window
    let window_properties = config.window_properties.clone();

    // TODO: right now, the frontend won't know if there was an error while trying to deserialize the config or data

    tauri::Builder::default()
        .setup(move |app| -> Result<(), Box<dyn std::error::Error>> {
            // defining main window
            let main_window = tauri::WindowBuilder::new(app, "MainWindow", tauri::WindowUrl::App("/index.html".into()))
                .resizable(true)
                .title(window_properties.title)
                .fullscreen(window_properties.fullscreen);

            main_window.build()?;

            return Ok(());
        })
        .manage(MakotoStateWrapper(Arc::new(Mutex::new(MakotoState { config, data }))))
        .invoke_handler(tauri::generate_handler![
             try_serialize_default_config,
             try_deserialize_from_config_file,
             try_serialize_default_data,
             try_deserialize_from_data_file
         ])
        .run(app_context)
        .expect("error while running tauri application");

    return Ok(());
}
