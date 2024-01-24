use crate::error::{MakotoError, MakotoResult};

use std::{fs::{self, OpenOptions}, io::{Read, Write}, path::Path};
use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct XYPair
{
    pub x: f64,
    pub y: f64
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WidthHeightPair
{
    pub width: f64,
    pub height: f64
}

/// serializable struct that holds all of the window-related user configuration options in the config.yaml file
/// these are all settings that the program needs to restart in order to see the effects of
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WindowProperties
{
    // sizing
    pub initial_inner_size: Option<WidthHeightPair>,
    pub minimum_inner_size: Option<WidthHeightPair>,
    pub maximum_inner_size: Option<WidthHeightPair>,
    
    // position
    pub initial_position: Option<XYPair>,
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
            initial_inner_size: None,
            minimum_inner_size: None,
            maximum_inner_size: None,

            initial_position: None,
            fullscreen: false,
            centered: true,

            title: "makoto".into()
        };
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoProperties
{
    
}

/// serializable struct that represents the user configuration i.e. window settings, etc.
#[derive(Debug, Serialize, Deserialize, Clone)]
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
    /// performs the initial setup of the config file at the given path by creating the full path and writing the default config to it
    fn set_up_config_file(config_file_path: &Path) -> MakotoResult<()>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(config_file_path.parent().ok_or(MakotoError::FailedToGetPath("config file parent".into()))?)?;

        let serialized_config = serde_yaml::to_string(&MakotoConfig::default())?;

        return Ok(fs::write(&config_file_path, &serialized_config)?);
    }

    /// attempts to deserialize a `MakotoConfig` struct from the config file at the given path.
    /// errors can happen due to multiple reasons including:
    /// - the config file parent path is invalid
    /// - the config file fails to be written to
    /// - the config file contents are not valid utf-8
    /// - the deserialization itself (config file is invalid YAML / doesn't align with struct)
    pub fn try_deserialize_from_config(config_file_path: &Path) -> MakotoResult<Self>
    {
        if !config_file_path.exists()
        {
            Self::set_up_config_file(config_file_path)?;
        }

        // create file if it doesn't exist (need to use write), in read mode to deserialize
        let mut config_file = OpenOptions::new()
            .read(true)
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
        if !config_file_path.exists()
        {
            Self::set_up_config_file(config_file_path)?;
        }

        // open config file in write mode and create it if it doesn't exist
        let mut config_file = OpenOptions::new()
            .write(true)
            .open(config_file_path)?;

        // convert config object to yaml string
        let serialized_makoto_config = serde_yaml::to_string(self)?;

        // write yaml string to config file
        config_file.write_all(serialized_makoto_config.as_bytes())?;

        return Ok(());
    }
}