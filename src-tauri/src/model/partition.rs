use serde::{Serialize, Deserialize};

use super::day_time::{DayTime, DayTimeRange};
use super::activation::{ActivationOperator, ActivationQuery, ActivationModifier};

// ----------------
// - RawPartition -
// ----------------

/// struct used for a one-off partition, like an "event"
/// can not reoccur, has a `title`, `decription`, and is active during the span of the given `DayTimeRange`
#[derive(Debug, Serialize, Deserialize)]
pub struct RawPartition
{
    pub title: String,
    pub description: String,
    pub day_time_range: DayTimeRange
}

impl RawPartition
{
    pub fn new(title: String, description: String, day_time_range: DayTimeRange) -> Self
    {
        return Self { title, description, day_time_range };
    }
}

// TODO: rework RawPartition time range. some partitions may want to span months or years

// -----------------
// - PartitionRule -
// -----------------

/// struct used for a partition that has a more complicated condition for when it should be active
/// used for imitating "reoccuring" behavior in typical events
/// MUST have a base `ActivationQuery`, and can have 0+ `ActivationModifier`
#[derive(Debug, Serialize, Deserialize)]
pub struct PartitionRule
{
    pub title: String,
    pub description: String,
    pub query: ActivationQuery,
    pub query_modifiers: Vec<ActivationModifier>
}

impl PartitionRule
{
    pub fn new(title: String, description: String, query: ActivationQuery, query_modifiers: Vec<ActivationModifier>) -> Self
    {
        return Self { title, description, query, query_modifiers };
    }
}

// --------------
// - unit tests -
// --------------
#[cfg(test)]
mod tests
{
    use super::*;
    use crate::model::day_time::{Time, DayTime, DayTimeRange};
    use crate::model::activation::{ActivationOperator, ActivationQuery, ActivationModifier};
}
