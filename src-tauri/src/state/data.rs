use std::{collections::HashMap, fs::{self, OpenOptions}, io::{Read, Write}, path::Path};

use serde::{Serialize, Deserialize};

use super::tag::Tag;
use crate::{error::{MakotoError, MakotoResult}, model::partition::{PartitionRule, RawPartition}};

/// serializable struct that represents the user data i.e. partitions, partition rules, etc.
/// holds all partitions and all created partition tags
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct MakotoData
{
    pub raw_partitions: Vec<RawPartition>,
    pub partition_rules: Vec<PartitionRule>,
    pub tags: HashMap<String, Tag>
}

impl Default for MakotoData
{
    fn default() -> Self
    {
        return Self
        {
            raw_partitions: Vec::new(),
            partition_rules: Vec::new(),
            tags: HashMap::new()
        };
    }
}

impl MakotoData
{
    /// performs the initial setup of the data file at the given path by creating the full path and writing the default data to it
    fn set_up_data_file(data_file_path: &Path) -> MakotoResult<()>
    {
        // create parent and own directories if they don't exist
        fs::create_dir_all(data_file_path.parent().ok_or(MakotoError::FailedToGetPath("data file parent".into()))?)?;

        let serialized_data = serde_json::to_string(&MakotoData::default())?;

        return Ok(fs::write(&data_file_path, &serialized_data)?);
    }

    /// attempts to deserialize a `MakotoData` struct from the data file at the given path.
    /// errors can happen due to multiple reasons including:
    /// - the data file parent path is invalid
    /// - the data file fails to open
    /// - the data file contents are not valid utf-8
    /// - the deserialization itself (data file is invalid JSON / doesn't align with struct)
    pub fn try_deserialize_from_data(data_file_path: &Path) -> MakotoResult<Self>
    {
        if !data_file_path.exists()
        {
            Self::set_up_data_file(&data_file_path)?;
        }

        // create file if it doesn't exist (need to use write), in read mode to deserialize
        let mut data_file = OpenOptions::new()
            .read(true)
            .open(data_file_path)?;

        let mut data_file_contents: String = String::with_capacity(200);

        // read user data into string
        let _ = data_file.read_to_string(&mut data_file_contents)?;

        // return the Userdata object
        return Ok(serde_json::from_str::<Self>(data_file_contents.as_str())?);
    }

    /// attempts to serialize a `Makotodata` struct into the data file at the given path.
    /// errors can happen due to multiple reasons including:
    /// - the data file parent path is invalid
    /// - the data file fails to open
    /// - the struct fails to serialize into YAML
    /// - an error occured when trying to write to the file
    pub fn try_serialize_to_data(&self, data_file_path: &Path) -> MakotoResult<()>
    {
        if !data_file_path.exists()
        {
            Self::set_up_data_file(&data_file_path)?;
        }

        // open data file in write mode and create it if it doesn't exist
        let mut data_file = OpenOptions::new()
            .write(true)
            .open(data_file_path)?;

        // convert data object to yaml string
        let serialized_makoto_data = serde_json::to_string(self)?;

        // write yaml string to data file
        data_file.write_all(serialized_makoto_data.as_bytes())?;

        return Ok(());
    }
}