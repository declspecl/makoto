use crate::model::day_time::{DaysOfWeek, DaysOfMonth, TimeRange};

use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
#[serde(tag = "tag")]
pub enum ActivationQuery
{
    InTimeRange(TimeRange),
    OnDaysOfWeek(DaysOfWeek),
    OnDaysOfMonth(DaysOfMonth),
}

// ----------------------------
// - serialization unit tests -
// ----------------------------
#[cfg(test)]
mod tests
{
    use super::*;
    use crate::model::day_time::{Day, Time};

    use serde_json::json;

    #[test]
    fn test_activation_query_serialization()
    {
        assert_eq!(
            json!(ActivationQuery::InTimeRange(TimeRange::new(Time::new(0, 0), Time::new(23, 59)))).to_string(),
            r#"
            {
                "end": {
                    "hour":23,
                    "minute":59
                },
                "start": {
                    "hour":0,
                    "minute":0
                },
                "tag": "InTimeRange"
            }
            "#.replace(" ", "").replace("\n", "")
        );

        assert_eq!(
            json!(ActivationQuery::OnDaysOfWeek(DaysOfWeek::new(vec![Day::Monday, Day::Tuesday]))).to_string(),
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
}