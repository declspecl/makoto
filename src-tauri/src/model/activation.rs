use serde::{Deserialize, Serialize};

use super::day_time::{DaysOfMonth, DaysOfWeek};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum ActivationOperator {
	AND,
	OR
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(tag = "type")]
pub enum ActivationQuery {
	OnDaysOfWeek(DaysOfWeek),
	OnDaysOfMonth(DaysOfMonth)
}

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
