use super::{ActivationQuery, ActivationOperator};

use serde::{Serialize, Deserialize};

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

// ----------------------------
// - serialization unit tests -
// ----------------------------
#[cfg(test)]
mod tests
{
    use crate::model::day_time::{DaysOfWeek, Day};

    use super::*;

    use serde_json::json;

    #[test]
    fn test_activation_modifier_serialization()
    {
        assert_eq!(
            json!(ActivationModifier::new(
                ActivationQuery::OnDaysOfWeek(DaysOfWeek::new(vec![Day::Monday, Day::Tuesday])),
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