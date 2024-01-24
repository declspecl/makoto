use crate::{error::MakotoResult, state::{config::MakotoConfig, data::MakotoData, MakotoState, MakotoStateWrapper}};

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
pub fn get_startup_error_log(state: tauri::State<MakotoStateWrapper>) -> Vec<String>
{
    let state = state.0.lock().unwrap();

    return state.data.startup_error_log.clone();
}