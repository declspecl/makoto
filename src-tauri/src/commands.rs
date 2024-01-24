use crate::{error::{MakotoError, MakotoResult}, state::{config::MakotoConfig, data::MakotoData}};

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

    return Ok(MakotoConfig::try_deserialize_from_config(&config_file_path)?);
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_serialize_default_data(app_handle: AppHandle) -> MakotoResult<()>
{
    let data = MakotoData::default();

    let data_file_path = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or(MakotoError::FailedToGetPath("app data dir".into()))?
        .join("data.json");

    return data.try_serialize_to_data(&data_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_deserialize_from_data_file(app_handle: AppHandle) -> MakotoResult<MakotoData>
{
    let data_file_path = app_handle
        .path_resolver()
        .app_data_dir()
        .ok_or(MakotoError::FailedToGetPath("app data dir".into()))?
        .join("data.json");

    return Ok(MakotoData::try_deserialize_from_data(&data_file_path)?);
}