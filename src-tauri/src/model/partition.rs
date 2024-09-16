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

// --------------
// - unit tests -
// --------------

/// serialization unit tests for `crate::model::partition`
#[cfg(test)]
mod serialization_tests {
	use super::*;
	use crate::model::day_time::{DayOfWeek, DaysOfWeek, Month, PointInTime, Time};

	use serde_json::json;

	/// ensures correct serialization for the `RawPartition` struct
	#[test]
	fn raw_partition() {
		assert_eq!(
			json!(RawPartition::new(
				"My-title".into(),       // avoiding spaces due to replace(" ", "")
				"My-description".into(), // avoiding spaces due to replace(" ", "")
				PeriodOfTime::new(
					PointInTime::new(
						2024,
						Month::January,
						23,
						Time::new(0, 0)
					),
					PointInTime::new(
						2024,
						Month::January,
						24,
						Time::new(0, 0)
					),
				),
				vec![0, 2, 4, 9]
			))
			.to_string(),
			r#"
            {
                "description": "My-description",
                "period_of_time": {
                    "end": {
                        "day_of_month": 24,
                        "month": "January",
                        "time": {
                            "hour": 0,
                            "minute": 0
                        },
                        "year": 2024
                    },
                    "start": {
                        "day_of_month": 23,
                        "month": "January",
                        "time": {
                            "hour": 0,
                            "minute": 0
                        },
                        "year": 2024
                    }
                },
                "tag_indices": [0, 2, 4, 9],
                "title": "My-title"
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}

	#[test]
	fn partition_rule() {
		assert_eq!(
			json!(PartitionRule::new(
				"My-title".into(),       // avoiding spaces due to replace(" ", "")
				"My-description".into(), // avoiding spaces due to replace(" ", "")
				ActivationQuery::OnDaysOfWeek(DaysOfWeek::new(vec![
					DayOfWeek::Monday,
					DayOfWeek::Thursday
				])),
				vec![],
				vec![1, 3, 5]
			))
			.to_string(),
			r#"
            {
                "description": "My-description",
                "query": {
                    "days": [
                        "Monday",
                        "Thursday"
                    ],
                    "tag": "OnDaysOfWeek"
                },
                "query_modifiers": [],
                "tag_indices": [1, 3, 5],
                "title": "My-title"
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}
}
