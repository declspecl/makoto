use serde::Serialize;
use std::{error::Error, io};

fn serialize_error<S, T: Error>(
	error: &T,
	serializer: S
) -> Result<S::Ok, S::Error>
where
	S: serde::Serializer
{
	return serializer.serialize_str(&error.to_string());
}

#[derive(thiserror::Error, Debug, Serialize)]
#[serde(tag = "type", content = "message")]
pub enum MakotoError {
	#[error("IOError of type \"{}\": \"{0}\"", .0.kind())]
	#[serde(serialize_with = "serialize_error")]
	IOError(#[from] io::Error),

	#[error("Failed to get path \"{0}\"")]
	FailedToGetPath(String),

	#[error("File does not exist \"{0}\"")]
	FileDoesNotExist(String),

	#[error("toml_edit serialization error: \"{0}\"")]
	#[serde(serialize_with = "serialize_error")]
	TOMLEditSerError(#[from] toml_edit::ser::Error),

	#[error("toml_edit deserialization error: \"{0}\"")]
	#[serde(serialize_with = "serialize_error")]
	TOMLEditDeError(#[from] toml_edit::de::Error),

	#[error("serde_json error: \"{0}\"")]
	#[serde(serialize_with = "serialize_error")]
	SerdeJsonError(#[from] serde_json::Error)
}

pub type MakotoResult<T> = Result<T, MakotoError>;
