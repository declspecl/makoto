pub mod tag;
pub mod data;
pub mod config;

use data::MakotoData;
use config::{MakotoConfig, WindowProperties, MakotoProperties};

use serde::{Serialize, Deserialize};

/// serializable struct that represents the user configuration and the user data
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoState
{
    pub config: MakotoConfig,
    pub data: MakotoData
}

impl Default for MakotoState
{
    fn default() -> Self
    {
        return Self
        {
            config: MakotoConfig
            {
                window_properties: WindowProperties::default(),
                makoto_properties: MakotoProperties {}
            },
            data: MakotoData::default()
        };
    }
}
