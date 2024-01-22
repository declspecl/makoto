use std::sync::{Arc, Mutex};

use serde::Serialize;

/// MakotoState needs to be serialized to disk, but can't serialize Arc or Mutex, so
/// instead Tauri will manage this wrapper and I will serialize the internal state to disk
#[derive(Debug)]
pub struct MakotoStateWrapper(pub Arc<Mutex<MakotoState>>);

#[derive(Debug, Serialize)]
pub struct MakotoState
{
    pub test_state: u8
}

impl MakotoState
{
    pub fn new(test_state: u8) -> Self
    {
        return MakotoState { test_state };
    }
}