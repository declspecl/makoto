use serde::{Deserialize, Serialize};

/// struct representing a color in RGB format
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RgbColor
{
    pub r: u8,
    pub g: u8,
    pub b: u8
}

impl RgbColor
{
    pub fn new(r: u8, g: u8, b: u8) -> Self
    {
        return Self { r, g, b };
    }
}

/// struct representing a descriptive tag that can be applied to a partition
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Tag
{
    pub name: String,
    pub description: String,
    pub color: RgbColor
}