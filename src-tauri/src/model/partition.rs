use serde::{Deserialize, Serialize};

use super::{
	activation::{ActivationModifier, ActivationQuery},
	day_time::PeriodOfTime
};

/// struct used for a one-off partition, like an "event"
/// can not reoccur, has a `title`, `decription`, and is active during the span of the given `PeriodOfTime`
/// applied tags can be gotten by finding the tag with the same name in `MakotoData::tag_pool`
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RawPartition {
	pub title: String,
	pub description: String,
	pub period_of_time: PeriodOfTime,
	pub tag_indices: Vec<u64>
}

impl RawPartition {
	pub fn new(
		title: String,
		description: String,
		period_of_time: PeriodOfTime,
		tag_indices: Vec<u64>
	) -> Self {
		return Self {
			title,
			description,
			period_of_time,
			tag_indices
		};
	}
}

/// struct used for a partition that has a more complicated condition for when it should be active.
/// used for imitating "reoccuring" behavior in typical events.
/// MUST have a base `ActivationQuery`, and can have 0+ `ActivationModifier`.
/// applied tags can be gotten by finding the tag with the same name in `MakotoData::tag_pool`
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PartitionRule {
	pub title: String,
	pub description: String,
	pub query: ActivationQuery,
	pub query_modifiers: Vec<ActivationModifier>,
	pub tag_indices: Vec<u64>
}

impl PartitionRule {
	pub fn new(
		title: String,
		description: String,
		query: ActivationQuery,
		query_modifiers: Vec<ActivationModifier>,
		tag_indices: Vec<u64>
	) -> Self {
		return Self {
			title,
			description,
			query,
			query_modifiers,
			tag_indices
		};
	}
}
