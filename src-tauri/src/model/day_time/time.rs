use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Time
{
    pub hour: u8,
    pub minute: u8
}

impl Time
{
    pub fn new(hour: u8, minute: u8) -> Self
    {
        return Self { hour, minute };
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TimeRange
{
    pub start: Time,
    pub end: Time
}

impl TimeRange
{
    pub fn new(start: Time, end: Time) -> Self
    {
        return Self { start, end };
    }
}

// ----------------------------
// - serialization unit tests -
// ----------------------------
#[cfg(test)]
mod tests
{
    use super::*;

    use serde_json::json;

    #[test]
    fn test_time_serialization()
    {
        assert_eq!(
            json!(Time::new(0, 0)).to_string(),
            r#"
            {
                "hour":0,
                "minute":0
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }

    #[test]
    fn test_time_range_serialization()
    {
        assert_eq!(
            json!(TimeRange::new(Time::new(0, 0), Time::new(23, 59))).to_string(),
            r#"
            {
                "end": {
                    "hour":23,
                    "minute":59
                },
                "start": {
                    "hour":0,
                    "minute":0
                }
            }
            "#.replace(" ", "").replace("\n", "")
        );
    }
}