use tauri::AppHandle;

use crate::{error::{MakotoError, MakotoResult}, state::{config::MakotoConfig, data::MakotoData, MakotoState, MakotoStateWrapper}};

#[tauri::command(rename_all = "snake_case")]
pub fn get_state(state: tauri::State<MakotoStateWrapper>) -> MakotoResult<MakotoState>
{
    let state = state.0.lock().unwrap();

    return Ok(state.clone());
}

#[tauri::command(rename_all = "snake_case")]
pub fn update_state_config(state: tauri::State<MakotoStateWrapper>, new_config: MakotoConfig)
{
    let mut state = state.0.lock().unwrap();

    state.config = new_config;
}

#[tauri::command(rename_all = "snake_case")]
pub fn update_state_data(state: tauri::State<MakotoStateWrapper>, new_data: MakotoData)
{
    let mut state = state.0.lock().unwrap();

    state.data = new_data;
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_serialize_state_config_to_disk(state: tauri::State<MakotoStateWrapper>, app: AppHandle) -> MakotoResult<()>
{
    let config_file_path = app
        .path_resolver()
        .app_config_dir()
        .ok_or(MakotoError::FailedToGetPath("app config".into()))?
        .join("config.yaml");

    let state = state.0.lock().unwrap();

    return state.config.try_serialize_to_config(&config_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn try_serialize_state_data_to_disk(state: tauri::State<MakotoStateWrapper>, app: AppHandle) -> MakotoResult<()>
{
    let data_file_path = app
        .path_resolver()
        .app_data_dir()
        .ok_or(MakotoError::FailedToGetPath("app data".into()))?
        .join("data.json");

    let state = state.0.lock().unwrap();

    return state.data.try_serialize_to_data(&data_file_path);
}

#[tauri::command(rename_all = "snake_case")]
pub fn get_startup_error_log(state: tauri::State<MakotoStateWrapper>) -> Vec<String>
{
    let state = state.0.lock().unwrap();

    return state.data.startup_error_log.clone();
}