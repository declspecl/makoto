use serde::{Serialize, Deserialize};

use super::{activation::{ActivationQuery, ActivationModifier}, day_time::PeriodOfTime};

/// struct used for a one-off partition, like an "event"
/// can not reoccur, has a `title`, `decription`, and is active during the span of the given `PeriodOfTime`
/// applied tags can be gotten by finding the tag with the same name in `MakotoData::tag_pool`
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RawPartition
{
    pub title: String,
    pub description: String,
    pub period_of_time: PeriodOfTime,
    pub tag_names: Vec<String>
}

impl RawPartition
{
    pub fn new(title: String, description: String, period_of_time: PeriodOfTime, tag_names: Vec<String>) -> Self
    {
        return Self { title, description, period_of_time, tag_names };
    }
}

/// struct used for a partition that has a more complicated condition for when it should be active.
/// used for imitating "reoccuring" behavior in typical events.
/// MUST have a base `ActivationQuery`, and can have 0+ `ActivationModifier`.
/// applied tags can be gotten by finding the tag with the same name in `MakotoData::tag_pool`
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PartitionRule
{
    pub title: String,
    pub description: String,
    pub query: ActivationQuery,
    pub query_modifiers: Vec<ActivationModifier>,
    pub tag_names: Vec<String>
}

impl PartitionRule
{
    pub fn new(title: String, description: String, query: ActivationQuery, query_modifiers: Vec<ActivationModifier>, tag_names: Vec<String>) -> Self
    {
        return Self { title, description, query, query_modifiers, tag_names };
    }
}

// --------------
// - unit tests -
// --------------

/// serialization unit tests for `crate::model::partition`
#[cfg(test)]
mod serialization_tests
{
    use super::*;
    use crate::model::day_time::{Month, PointInTime, Time};

    use serde_json::json;

    /// ensures correct serialization for the `RawPartition` struct
    #[test]
    fn raw_partition()
    {
        assert_eq!(
            json!(RawPartition::new(
                "My-title".into(), // avoiding spaces due to replace(" ", "")
                "My-description".into(), // avoiding spaces due to replace(" ", "")
                PeriodOfTime::new(
                    PointInTime::new(2024, Month::January, 23, Time::new(0, 0)),
                    PointInTime::new(2024, Month::January, 24, Time::new(0, 0)),
                ),
                vec!["my-tag-1".into(), "my-tag-2".into()]
            )).to_string(),
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
                "tag_names": [
                    "my-tag-1",
                    "my-tag-2"
                ],
                "title": "My-title"
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    #[test]
    fn partition_rule()
    {
        assert_eq!(
            json!(PartitionRule::new(
                "My-title".into(), // avoiding spaces due to replace(" ", "")
                "My-description".into(), // avoiding spaces due to replace(" ", "")
                ActivationQuery::InPeriodOfTime(
                    PeriodOfTime::new(
                        PointInTime::new(2024, Month::January, 23, Time::new(0, 0)),
                        PointInTime::new(2024, Month::January, 24, Time::new(0, 0)),
                    )
                ),
                vec![],
                vec!["my-tag-1".into(), "my-tag-2".into()]
            )).to_string(),
            r#"
            {
                "description": "My-description",
                "query": {
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
                    },
                    "tag": "InPeriodOfTime"
                },
                "query_modifiers": [],
                "tag_names": [
                    "my-tag-1",
                    "my-tag-2"
                ],
                "title": "My-title"
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }
}
