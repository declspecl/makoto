#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use error::MakotoResult;
use state::config::MakotoConfig;

pub mod commands;
pub mod error;
pub mod model;
pub mod state;

use commands::{try_deserialize_state_from_disk, try_serialize_state_to_disk};
use tauri::api::path::app_config_dir;

fn main() -> MakotoResult<()> {
	let app_context = tauri::generate_context!();

	let config: MakotoConfig = match app_config_dir(app_context.config()) {
		Some(config_parent_dir) => {
			let config_file_path = config_parent_dir.join("config.toml");

			match MakotoConfig::try_deserialize_from_config(&config_file_path, false) {
				Ok(config) => config,
				Err(_) => MakotoConfig::default()
			}
		},
		None => MakotoConfig::default()
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
				println!(
					"Successfully created main window {}",
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
