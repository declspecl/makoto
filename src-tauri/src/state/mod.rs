use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

// -----------
// - config -
// -----------

/// serializable struct that holds all of the window-related user configuration options in the config.yaml file
/// these are all settings that the program needs to restart in order to see the effects of
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WindowProperties
{
    // sizing
    pub initial_width: Option<f64>,
    pub initial_height: Option<f64>,
    pub minimum_width: Option<f64>,
    pub minimum_height: Option<f64>,
    pub maximum_width: Option<f64>,
    pub maximum_height: Option<f64>,
    
    // position
    pub x_position: Option<f64>,
    pub y_position: Option<f64>,
    pub fullscreen: bool,
    pub centered: bool,

    // misc
    pub title: String
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoProperties
{
    
}

/// serializable struct that represents the user configuration i.e. window settings, etc.
#[derive(Debug, Serialize, Deserialize)]
pub struct MakotoConfig
{
    pub window_properties: WindowProperties,
    pub makoto_properties: MakotoProperties
}

// --------
// - data -
// --------

/// serializable struct that represents the user data i.e. partitions, partition rules, etc.
#[derive(Debug, Serialize, Deserialize)]
pub struct MakotoData
{

}

// ---------
// - state -
// ---------

/// serializable struct that represents the user configuration and the user data
#[derive(Debug, Serialize)]
pub struct MakotoState
{
    pub config: MakotoConfig,
    pub data: MakotoData
}

/// MakotoState needs to be serialized to disk, but can't serialize Arc or Mutex, so
/// instead Tauri will manage this wrapper and I will serialize the internal state to disk
#[derive(Debug)]
pub struct MakotoStateWrapper(pub Arc< Mutex<MakotoState> >);
