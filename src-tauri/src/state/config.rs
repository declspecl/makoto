use crate::error::{MakotoError, MakotoResult};

use serde::{Deserialize, Serialize};
use std::{
	fs::{self, OpenOptions},
	io::{Read, Write},
	path::Path
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CoordinatePair {
	pub x: f64,
	pub y: f64
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WidthHeightPair {
	pub width: f64,
	pub height: f64
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WindowProperties {
	pub initial_inner_size: Option<WidthHeightPair>,
	pub minimum_inner_size: Option<WidthHeightPair>,
	pub maximum_inner_size: Option<WidthHeightPair>,

	pub initial_position: Option<CoordinatePair>,
	pub maximized: bool,
	pub fullscreen: bool,
	pub centered: bool,

	pub title: String
}

impl Default for WindowProperties {
	fn default() -> Self {
		return Self {
			initial_inner_size: None,
			minimum_inner_size: None,
			maximum_inner_size: None,

			initial_position: None,
			maximized: false,
			fullscreen: false,
			centered: false,

			title: "makoto".into()
		};
	}
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoProperties {}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoConfig {
	pub window_properties: WindowProperties,
	pub makoto_properties: MakotoProperties
}

impl Default for MakotoConfig {
	fn default() -> Self {
		return Self {
			window_properties: WindowProperties::default(),
			makoto_properties: MakotoProperties {}
		};
	}
}

impl MakotoConfig {
	pub fn try_serialize_to_config(
		&self,
		config_file_path: &Path
	) -> MakotoResult<()> {
		if !config_file_path.exists() {
			fs::create_dir_all(
				config_file_path.parent().ok_or(MakotoError::FailedToGetPath(
					"config file parent".into()
				))?
			)?;
		}

		let mut config_file = OpenOptions::new().create(true).write(true).open(config_file_path)?;

		let serialized_makoto_config = toml_edit::ser::to_string_pretty(self)?;
		config_file.write_all(serialized_makoto_config.as_bytes())?;

		return Ok(());
	}

	pub fn try_deserialize_from_config(config_file_path: &Path) -> MakotoResult<Self> {
		if !config_file_path.exists() {
			return Err(MakotoError::FileDoesNotExist(
				config_file_path.to_string_lossy().into()
			));
		}

		let mut config_file = OpenOptions::new().read(true).open(config_file_path)?;
		let mut config_file_contents: String = String::with_capacity(200);
		let _ = config_file.read_to_string(&mut config_file_contents)?;

		return Ok(toml_edit::de::from_str::<Self>(
			config_file_contents.as_str()
		)?);
	}
}
