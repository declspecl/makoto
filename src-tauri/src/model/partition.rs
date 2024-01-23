use serde::{Serialize, Deserialize};

use super::day_time::{DayTime, DayTimeRange};
use super::activation::{ActivationOperator, ActivationQuery, ActivationModifier};

// ----------------
// - RawPartition -
// ----------------

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

// -----------------
// - PartitionRule -
// -----------------

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
