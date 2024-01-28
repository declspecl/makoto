use serde::{Deserialize, Serialize};

/// struct representing a descriptive tag that can be applied to a partition
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Tag
{
    pub name: String,
    pub description: String,
    pub color: String // hex string
}
