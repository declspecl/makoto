#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use state::MakotoState;

pub mod model;
pub mod state;
pub mod commands;

fn main()
{
    // proof of concept that i can create state before initializing tauri
    // in future, load partition state etc from a file here, THEN initialize tauri
    // that way, can use state in commands and write state to disk after commands execute successfully
    let state: MakotoState = MakotoState::new(10);

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}