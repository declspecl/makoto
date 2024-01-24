pub mod data;
pub mod config;

use data::MakotoData;
use config::{MakotoConfig, WindowProperties, MakotoProperties};

use serde::Serialize;
use std::sync::{Arc, Mutex};

/// serializable struct that represents the user configuration and the user data
#[derive(Debug, Serialize)]
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

/// MakotoState needs to be serialized to disk, but can't (trivially) serialize Arc or Mutex, so
/// instead Tauri will manage this wrapper and I will serialize the internal state to disk
#[derive(Debug)]
pub struct MakotoStateWrapper(pub Arc< Mutex<MakotoState> >);