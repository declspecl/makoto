use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Time
{
    pub hour: u8,
    pub minute: u8
}