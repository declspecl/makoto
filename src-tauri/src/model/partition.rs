use serde::{Deserialize, Serialize};

use super::{
	activation::{ActivationModifier, ActivationQuery},
	day_time::PeriodOfTime
};

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
