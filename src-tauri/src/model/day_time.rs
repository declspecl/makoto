use serde::{Serialize, Deserialize};

// --------
// - day -
// --------

/// serializable enum to represent the names of the days of the week
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

/// wrapper struct for serialization purposes of `Vec<Day>` 
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

/// wrapper struct for serialization purposes of `Vec<u8>` 
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

// --------
// - time -
// --------

/// struct to represent a time in the format `hour:minute` where `hour` and `minute` are `u8`s
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

/// struct to represent a time range in the format `hour:minute-hour:minute` for the same day
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

// -------------
// - day time -
// -------------

// struct used to represent a day of the month and a time in `hour:minute` format
#[derive(Debug, Serialize, Deserialize)]
pub struct DayTime
{
    pub day: u8,
    pub time: Time
}

impl DayTime
{
    pub fn new(day: u8, time: Time) -> Self
    {
        return Self { day, time };
    }
}

// struct used to represent a range of days of the month and times in `hour:minute` format
#[derive(Debug, Serialize, Deserialize)]
pub struct DayTimeRange
{
    pub start: DayTime,
    pub end: DayTime
}

impl DayTimeRange
{
    pub fn new(start: DayTime, end: DayTime) -> Self
    {
        return Self { start, end };
    }
}

// ---------
// - tests -
// ---------

/// serialization integration tests for `crate::model::day_time`
#[cfg(test)]
mod tests
{
    use super::*;

    use serde_json::json;

    // -------
    // - day -
    // -------

    /// ensures correct json serialization of the `Day` enum
    #[test]
    fn test_day_serialization()
    {
        assert_eq!(
            json!(Day::Sunday),
            r#"Sunday"#
        );
    }

    /// ensures correct json serialization of the `DaysOfWeek` struct
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

    /// ensures correct json serialization of the `DaysOfMonth` struct
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

    // --------
    // - time -
    // --------

    /// ensures correct json serialization of the `Time` struct
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

    /// ensures correct json serialization of the `TimeRange` struct
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
