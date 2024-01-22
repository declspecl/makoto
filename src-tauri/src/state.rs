use serde::{Deserialize, Serialize};
use std::sync::{Arc, Mutex};

#[derive(Debug, Serialize, Deserialize)]
pub struct MakotoConfig
{
    
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MakotoData
{

}

#[derive(Debug, Serialize)]
pub struct MakotoState
{
    pub config: MakotoConfig,
    pub data: MakotoData
}

/// MakotoState needs to be serialized to disk, but can't serialize Arc or Mutex, so
/// instead Tauri will manage this wrapper and I will serialize the internal state to disk
#[derive(Debug)]
pub struct MakotoStateWrapper(pub Arc< Mutex<MakotoState> >);