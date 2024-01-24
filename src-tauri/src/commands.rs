use crate::{error::{MakotoError, MakotoResult}, state::config::MakotoConfig};

use tauri::AppHandle;

#[tauri::command(rename_all = "snake_case")]
pub fn try_serialize_default_config(app_handle: AppHandle) -> MakotoResult<()>
{
    let config = MakotoConfig::default();

    let config_file_path = app_handle
        .path_resolver()
        .app_config_dir()
        .ok_or(MakotoError::FailedToGetPath("app config dir".into()))?
        .join("config.yaml");

    println!("{}", config_file_path.display());

    return config.try_serialize_to_config(&config_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_deserialize_from_config_file(app_handle: AppHandle) -> MakotoResult<MakotoConfig>
{
    let config_file_path = app_handle
        .path_resolver()
        .app_config_dir()
        .ok_or(MakotoError::FailedToGetPath("app config dir".into()))?
        .join("config.yaml");

    println!("{}", config_file_path.display());

    return Ok(MakotoConfig::try_deserialize_from_config(&config_file_path)?);
}