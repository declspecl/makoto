use crate::error::{MakotoError, MakotoResult};

use std::{fs::{self, OpenOptions}, io::{Read, Write}, path::Path};
use serde::{Serialize, Deserialize};

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

impl Default for WindowProperties
{
    fn default() -> Self
    {
        return Self
        {
            initial_width: None,
            initial_height: None,
            minimum_width: None,
            minimum_height: None,
            maximum_width: None,
            maximum_height: None,

            x_position: None,
            y_position: None,
            fullscreen: false,
            centered: false,

            title: "makoto".into()
        };
    }
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

impl Default for MakotoConfig
{
    fn default() -> Self
    {
        return Self
        {
            window_properties: WindowProperties::default(),
            makoto_properties: MakotoProperties {}
        };
    }
}

impl MakotoConfig
{
    /// attempts to deserialize a `MakotoConfig` struct from the config file at the given path.
    /// errors can happen due to multiple reasons including:
    /// - the config file parent path is invalid
    /// - the config file fails to open
    /// - the config file contents are not valid utf-8
    /// - the deserialization itself (config file is invalid YAML / doesn't align with struct)
    pub fn try_deserialize_from_config(config_file_path: &Path) -> MakotoResult<Self>
    {
        // create parent and own directories if they don't exist
        if !config_file_path.exists()
        {
            fs::create_dir_all(config_file_path.parent().ok_or(MakotoError::FailedToGetPath("config file parent".into()))?)?;
        }

        // create file if it doesn't exist (need to use write), in read mode to deserialize
        let mut config_file = OpenOptions::new()
            .read(true)
            .write(true)
            .create(true)
            .open(config_file_path)?;

        let mut config_file_contents: String = String::with_capacity(200);

        // read user config into string
        let _ = config_file.read_to_string(&mut config_file_contents)?;

        // return the UserConfig object
        return Ok(serde_yaml::from_str::<Self>(config_file_contents.as_str())?);
    }

    /// attempts to serialize a `MakotoConfig` struct into the config file at the given path.
    /// errors can happen due to multiple reasons including:
    /// - the config file parent path is invalid
    /// - the config file fails to open
    /// - the struct fails to serialize into YAML
    /// - an error occured when trying to write to the file
    pub fn try_serialize_to_config(&self, config_file_path: &Path) -> MakotoResult<()>
    {
        // create parent and own directories if they don't exist
        if !config_file_path.exists()
        {
            fs::create_dir_all(config_file_path.parent().ok_or(MakotoError::FailedToGetPath("config file parent".into()))?)?;
        }

        // open config file in write mode and create it if it doesn't exist
        let mut config_file = OpenOptions::new()
            .write(true)
            .create(true)
            .open(config_file_path)?;

        // convert config object to yaml string
        let serialized_makoto_config = serde_yaml::to_string(self)?;

        // write yaml string to config file
        config_file.write_all(serialized_makoto_config.as_bytes())?;

        return Ok(());
    }
}