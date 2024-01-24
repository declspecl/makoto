#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::{Arc, Mutex};

use state::MakotoState;
use error::MakotoResult;

use crate::state::MakotoStateWrapper;

pub mod model;
pub mod state;
pub mod error;
pub mod commands;

use commands::{try_deserialize_from_config_file, try_serialize_default_config};

fn main() -> MakotoResult<()>
{
    // proof of concept that i can create state before initializing tauri
    // in future, load partition state etc from a file here, THEN initialize tauri
    // that way, can use state in commands and write state to disk after commands execute successfully

    let state = MakotoState::default();

    tauri::Builder::default()
       .manage(MakotoStateWrapper(Arc::new(Mutex::new(state))))
       .invoke_handler(tauri::generate_handler![try_serialize_default_config, try_deserialize_from_config_file])
       .run(tauri::generate_context!())
       .expect("error while running tauri application");

    return Ok(());
}
