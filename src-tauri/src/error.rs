use serde::Serialize;
use std::io;

/// utility function to provide serialization for std::io::Error.
/// this function just serializes the error by calling `error.to_string()`
fn serialize_io_error<S>(
	error: &io::Error,
	serializer: S
) -> Result<S::Ok, S::Error>
where
	S: serde::Serializer
{
	return serializer.serialize_str(&error.to_string());
}

/// utility function to provide serialization for serde_yaml::Error.
/// this function just serializes the error by calling `error.to_string()`
fn serialize_serde_yaml_error<S>(
	error: &serde_yaml::Error,
	serializer: S
) -> Result<S::Ok, S::Error>
where
	S: serde::Serializer
{
	return serializer.serialize_str(&error.to_string());
}

/// utility function to provide serialization for serde_json::Error.
/// this function just serializes the error by calling `error.to_string()`
fn serialize_serde_json_error<S>(
	error: &serde_json::Error,
	serializer: S
) -> Result<S::Ok, S::Error>
where
	S: serde::Serializer
{
	return serializer.serialize_str(&error.to_string());
}

/// enum that wraps all the possible errros that may occur in the makoto backend
#[derive(thiserror::Error, Debug, Serialize)]
#[serde(tag = "tag", content = "error")]
pub enum MakotoError {
	#[error("Underlying IOError of type \"{}\": \"{0}\"", .0.kind())]
	#[serde(serialize_with = "serialize_io_error")]
	IOError(#[from] io::Error),

	#[error("Failed to get the \"{0}\" path")]
	FailedToGetPath(String),

	#[error("Underlying serde_yaml error: \"{0}\"")]
	#[serde(serialize_with = "serialize_serde_yaml_error")]
	SerdeYamlError(#[from] serde_yaml::Error),

	#[error("Underlying serde_json error: \"{0}\"")]
	#[serde(serialize_with = "serialize_serde_json_error")]
	SerdeJsonError(#[from] serde_json::Error)
}

/// wrapper result type that uses `MakotoError` as the error type
pub type MakotoResult<T> = Result<T, MakotoError>;

#[cfg(test)]
mod serialization_tests {
	use super::*;

	use serde_json::json;

	#[test]
	fn makoto_error_failed_to_get_path() {
		assert_eq!(
			json!(MakotoError::FailedToGetPath(
				"app data".into()
			))
			.to_string(),
			r#"{"error":"app data","tag":"FailedToGetPath"}"#
		);
	}
}
