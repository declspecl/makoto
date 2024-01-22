use std::sync::{Arc, Mutex};

#[derive(Debug)]
pub struct MakotoState
{
    pub test_state: Arc<Mutex<u8>>
}

impl MakotoState
{
    pub fn new(value: u8) -> Self
    {
        return MakotoState { test_state: Arc::new(Mutex::new(value)) };
    }
}