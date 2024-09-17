use std::{
	fs::{self, OpenOptions},
	io::{Read, Write},
	path::Path
};

use serde::{Deserialize, Serialize};

use crate::{
	error::{MakotoError, MakotoResult},
	model::{
		partition::{PartitionRule, RawPartition},
		tag::Tag
	}
};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoData {
	pub raw_partitions: Vec<RawPartition>,
	pub partition_rules: Vec<PartitionRule>,
	pub tag_pool: Vec<Tag>
}

impl Default for MakotoData {
	fn default() -> Self {
		return Self {
			raw_partitions: vec![],
			partition_rules: vec![],
			tag_pool: Vec::new()
		};
	}
}

impl MakotoData {
	pub fn try_deserialize_from_data(
		data_file_path: &Path,
		create_if_does_not_exist: bool
	) -> MakotoResult<Self> {
		if !data_file_path.exists() {
			if create_if_does_not_exist {
				MakotoData::default().try_serialize_to_data(data_file_path)?;
			} else {
				return Err(MakotoError::FileDoesNotExist(
					data_file_path.to_string_lossy().into()
				));
			}
		}

		let mut data_file = OpenOptions::new().read(true).open(data_file_path)?;
		let mut data_file_contents: String = String::with_capacity(200);
		let _ = data_file.read_to_string(&mut data_file_contents)?;

		return Ok(serde_json::from_str::<Self>(
			data_file_contents.as_str()
		)?);
	}

	pub fn try_serialize_to_data(
		&self,
		data_file_path: &Path
	) -> MakotoResult<()> {
		if !data_file_path.exists() {
			fs::create_dir_all(
				data_file_path.parent().ok_or(MakotoError::FailedToGetPath(
					"data file parent".into()
				))?
			)?;
		}

		let mut data_file = OpenOptions::new().create(true).write(true).open(data_file_path)?;
		let serialized_makoto_data = serde_json::to_string(self)?;
		data_file.write_all(serialized_makoto_data.as_bytes())?;

		return Ok(());
	}
}
