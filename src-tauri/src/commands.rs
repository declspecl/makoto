use crate::{error::{MakotoError, MakotoResult}, state::{MakotoConfig, MakotoStateWrapper}};

use std::{fs, io::Read};

#[tauri::command]
pub fn get_user_config(state: tauri::State<MakotoStateWrapper>, app_handle: tauri::AppHandle) -> MakotoResult<MakotoConfig>
{
    let mut config_file_path = app_handle
        .path_resolver()
        .app_config_dir()
        .ok_or(MakotoError::FailedToGetPath("app config".to_string()))?;

    fs::create_dir_all(&config_file_path)?;

    config_file_path.push("config.yaml");

    let mut config_file = fs::OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(config_file_path)?;

    let mut config_file_contents: String = String::with_capacity(200);

    // read user config into string
    let _ = config_file.read_to_string(&mut config_file_contents);

    // return the UserConfig object
    return match serde_yaml::from_str::<MakotoConfig>(config_file_contents.as_str())
    {
        Ok(user_config) => Ok(user_config),
        Err(err) => Err(MakotoError::SerdeYamlError(err))
    };
}