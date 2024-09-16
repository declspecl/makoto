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

/// utility function to provide serialization for toml_edit::Error.
/// this function just serializes the error by calling `error.to_string()`
fn serialize_toml_edit_ser_error<S>(
	error: &toml_edit::ser::Error,
	serializer: S
) -> Result<S::Ok, S::Error>
where
	S: serde::Serializer
{
	return serializer.serialize_str(&error.to_string());
}

/// utility function to provide serialization for toml_edit::Error.
/// this function just serializes the error by calling `error.to_string()`
fn serialize_toml_edit_de_error<S>(
	error: &toml_edit::de::Error,
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

	#[error("Underlying toml_edit error: \"{0}\"")]
	#[serde(serialize_with = "serialize_toml_edit_ser_error")]
	TOMLEditSerError(#[from] toml_edit::ser::Error),

	#[error("Underlying toml_edit error: \"{0}\"")]
	#[serde(serialize_with = "serialize_toml_edit_de_error")]
	TOMLEditDeError(#[from] toml_edit::de::Error),

	#[error("Underlying serde_json error: \"{0}\"")]
	#[serde(serialize_with = "serialize_serde_json_error")]
	SerdeJsonError(#[from] serde_json::Error)
}

/// wrapper result type that uses `MakotoError` as the error type
pub type MakotoResult<T> = Result<T, MakotoError>;
