pub mod config;
pub mod data;

use config::{MakotoConfig, MakotoProperties, WindowProperties};
use data::MakotoData;

use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoState {
	pub config: MakotoConfig,
	pub data: MakotoData
}

impl Default for MakotoState {
	fn default() -> Self {
		return Self {
			config: MakotoConfig {
				window_properties: WindowProperties::default(),
				makoto_properties: MakotoProperties {}
			},
			data: MakotoData::default()
		};
	}
}
