#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use error::MakotoResult;
use log::info;
use state::config::MakotoConfig;

pub mod commands;
pub mod error;
pub mod logging;
pub mod model;
pub mod state;

use commands::{try_deserialize_state_from_disk, try_serialize_state_to_disk};
use tauri::api::path::{app_config_dir, app_data_dir};

fn main() -> MakotoResult<()> {
	let app_context = tauri::generate_context!();

	let app_data_dir = app_data_dir(app_context.config()).expect("Fatal error: failed to get app data directory from app context");
	let app_config_dir = app_config_dir(app_context.config()).expect("Fatal error: failed to get app data directory from app context");

	if !app_data_dir.exists() {
		std::fs::create_dir_all(app_data_dir.to_owned())?;
	}

	logging::init_log4rs(&app_data_dir);

	let config: MakotoConfig = {
		let config_file_path = app_config_dir.join("config.toml");

		match MakotoConfig::try_deserialize_from_config(&config_file_path, false) {
			Ok(config) => config,
			Err(_) => MakotoConfig::default()
		}
	};

	let window_properties = config.window_properties;

	tauri::Builder::default()
		.setup(
			move |app| -> Result<(), Box<dyn std::error::Error>> {
				let mut window_builder = tauri::WindowBuilder::new(
					app,
					"MainWindow",
					tauri::WindowUrl::App("/index.html".into())
				)
				.resizable(true)
				.title(window_properties.title)
				.maximized(window_properties.maximized)
				.fullscreen(window_properties.fullscreen);

				if window_properties.centered {
					window_builder = window_builder.center();
				} else if let Some(position) = window_properties.initial_position {
					window_builder = window_builder.position(position.x, position.y);
				}

				if let Some(size) = window_properties.initial_inner_size {
					window_builder = window_builder.inner_size(size.width, size.height);
				}

				if let Some(size) = window_properties.minimum_inner_size {
					window_builder = window_builder.min_inner_size(size.width, size.height);
				}

				if let Some(size) = window_properties.maximum_inner_size {
					window_builder = window_builder.max_inner_size(size.width, size.height);
				}

				let main_window = window_builder.build()?;

				info!(
					"Successfully created main window '{}'",
					main_window.label()
				);

				return Ok(());
			}
		)
		.invoke_handler(tauri::generate_handler![
			try_serialize_state_to_disk,
			try_deserialize_state_from_disk
		])
		.run(app_context)
		.expect("Failed to start Makoto. Please try again later");

	return Ok(());
}
