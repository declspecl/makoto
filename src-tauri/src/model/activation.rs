use serde::{Serialize, Deserialize};

use super::day_time::{DaysOfWeek, DaysOfMonth, PeriodOfTime};

/// enum for `ActivationModifier`s to identify it as either an `AND` or `OR` condition modifier
#[derive(Debug, Serialize, Deserialize)]
pub enum ActivationOperator
{
    AND,
    OR
}

/// enum to represent a query for when a `Partition` should be "active"
#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "tag")]
pub enum ActivationQuery
{
    InPeriodOfTime(PeriodOfTime),
    OnDaysOfWeek(DaysOfWeek),
    OnDaysOfMonth(DaysOfMonth),
}

/// struct to represent an additional `ActivationQuery` and `ActivationOperator` pair that modifies a base `ActivationQuery` with another activation condition
#[derive(Debug, Serialize, Deserialize)]
pub struct ActivationModifier
{
    pub query: ActivationQuery,
    pub operator: ActivationOperator
}

impl ActivationModifier
{
    pub fn new(query: ActivationQuery, operator: ActivationOperator) -> Self
    {
        return Self { query, operator };
    }
}

// --------------
// - unit tests -
// --------------

/// serialization unit tests for `crate::model::activation`
#[cfg(test)]
mod serialization_tests
{
    use super::*;
    use crate::model::day_time::{DayOfWeek, DaysOfMonth, DaysOfWeek, Month, PointInTime, Time};

    use serde_json::json;

    /// ensures correct json serialization of the `ActivationOperator` enum
    #[test]
    fn activation_operator()
    {
        assert_eq!(
            json!(ActivationOperator::AND),
            r#"AND"#
        );

        assert_eq!(
            json!(ActivationOperator::OR),
            r#"OR"#
        );
    }

    /// ensures correct json serialization of the `ActivationQuery` enum with the variant `ActivationQuery::InTimeRange`
    #[test]
    fn activation_query()
    {
        assert_eq!(
            json!(ActivationQuery::InPeriodOfTime(
                PeriodOfTime::new(
                    PointInTime::new(2024, Month::January, 23, Time::new(0, 0)),
                    PointInTime::new(2024, Month::January, 23, Time::new(23, 59)),
                )
            )).to_string(),
            r#"
            {
                "end": {
                    "day_of_month": 23,
                    "month": "January",
                    "time": {
                        "hour": 23,
                        "minute": 59
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
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    /// ensures correct json serialization of the `ActivationQuery` enum with the variant `ActivationQuery::OnDaysOfWeek`
    #[test]
    fn activation_query_days_of_week()
    {
        assert_eq!(
            json!(ActivationQuery::OnDaysOfWeek(DaysOfWeek::new(vec![DayOfWeek::Monday, DayOfWeek::Tuesday]))).to_string(),
            r#"
            {
                "days": [
                    "Monday",
                    "Tuesday"
                ],
                "tag": "OnDaysOfWeek"
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    /// ensures correct json serialization of the `ActivationQuery` enum with the variant `ActivationQuery::OnDaysOfMonth`
    #[test]
    fn activation_query_days_of_month()
    {
        assert_eq!(
            json!(ActivationQuery::OnDaysOfMonth(DaysOfMonth::new(vec![1, 31]))).to_string(),
            r#"
            {
                "days": [
                    1,
                    31
                ],
                "tag": "OnDaysOfMonth"
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    /// ensures correct json serialization of the `ActivationModifier` struct
    #[test]
    fn activation_modifier()
    {
        assert_eq!(
            json!(ActivationModifier::new(
                ActivationQuery::OnDaysOfWeek(DaysOfWeek::new(vec![DayOfWeek::Monday, DayOfWeek::Tuesday])),
                ActivationOperator::AND
            )).to_string(),
            r#"
            {
                "operator": "AND",
                "query": {
                    "days": [
                        "Monday",
                        "Tuesday"
                    ],
                    "tag":"OnDaysOfWeek"
                }
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }
}
