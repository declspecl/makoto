use serde::{Deserialize, Serialize};

/// struct representing a descriptive tag that can be applied to a partition
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Tag {
	pub name: String,
	pub description: String,
	pub color: String // hex string
}

#[cfg(test)]
mod serialization_tests {
	use super::*;

	use serde_json::json;

	#[test]
	fn tag() {
		assert_eq!(
			json!(Tag {
				name: "MyName".into(),
				description: "MyDescription".into(),
				color: "#af924e".into()
			})
			.to_string(),
			r##"
            {
                "color": "#af924e",
                "description": "MyDescription",
                "name": "MyName"
            }
            "##
			.replace(" ", "")
			.replace("\n", "")
		);
	}
}
