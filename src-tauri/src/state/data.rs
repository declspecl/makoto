use serde::{Serialize, Deserialize};

use crate::error::MakotoResult;

/// serializable struct that represents the user data i.e. partitions, partition rules, etc.
#[derive(Debug, Serialize, Deserialize)]
pub struct MakotoData
{

}

impl MakotoData
{
    pub fn try_deserialize_from_config() -> MakotoResult<Self>
    {
        todo!("implement MakotoData::try_deserialize_from_config() when MakotoData is defined");
    }

    pub fn try_serialize_to_config() -> MakotoResult<Self>
    {
        todo!("implement MakotoData::try_serialize_from_config() when MakotoData is defined");
    }
}