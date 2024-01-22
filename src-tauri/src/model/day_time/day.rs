use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum Day
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DaysOfWeek
{
    pub days: Vec<Day>
}

impl DaysOfWeek
{
    pub fn new(days: Vec<Day>) -> Self
    {
        return Self { days };
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DaysOfMonth
{
    pub days: Vec<u8>
}

impl DaysOfMonth
{
    pub fn new(days: Vec<u8>) -> Self
    {
        return Self { days };
    }
}

// ----------------------------
// - serialization unit tests -
// ----------------------------
#[cfg(test)]
mod tests
{
    use super::*;
    use crate::model::day_time::{DaysOfWeek, Day};

    use serde_json::json;

    #[test]
    fn test_day_serialization()
    {
        assert_eq!(
            json!(Day::Sunday),
            r#"Sunday"#
        );
    }

    #[test]
    fn test_days_of_week_serialization()
    {
        assert_eq!(
            json!(DaysOfWeek::new(vec![Day::Monday, Day::Tuesday])).to_string(),
            r#"
            {
                "days": [
                    "Monday",
                    "Tuesday"
                ]
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    #[test]
    fn test_days_of_month_serialization()
    {
        assert_eq!(
            json!(DaysOfMonth::new(vec![1, 31])).to_string(),
            r#"
            {
                "days": [
                    1,
                    31
                ]
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }
}