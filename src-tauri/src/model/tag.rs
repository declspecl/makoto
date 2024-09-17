use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Tag {
	pub name: String,
	pub description: String,
	pub color: String // hex color
}
