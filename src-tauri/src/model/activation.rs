use serde::{Deserialize, Serialize};

use super::day_time::{DaysOfMonth, DaysOfWeek};

/// enum for `ActivationModifier`s to identify it as either an `AND` or `OR` condition modifier
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum ActivationOperator {
	AND,
	OR
}

/// enum to represent a query for when a `Partition` should be "active"
#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(tag = "tag")]
pub enum ActivationQuery {
	OnDaysOfWeek(DaysOfWeek),
	OnDaysOfMonth(DaysOfMonth)
}

/// struct to represent an additional `ActivationQuery` and `ActivationOperator` pair that modifies a base `ActivationQuery` with another activation condition
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ActivationModifier {
	pub query: ActivationQuery,
	pub operator: ActivationOperator
}

impl ActivationModifier {
	pub fn new(
		query: ActivationQuery,
		operator: ActivationOperator
	) -> Self {
		return Self { query, operator };
	}
}
