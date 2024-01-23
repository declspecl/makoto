use serde::{Serialize, Deserialize};

// --------
// - day -
// --------

/// serializable enum to represent the names of the days of the week
#[derive(Debug, Serialize, Deserialize)]
pub enum DayOfWeek
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

/// wrapper struct for serialization purposes of `Vec<DayOfWeek>` 
#[derive(Debug, Serialize, Deserialize)]
pub struct DaysOfWeek
{
    pub days: Vec<DayOfWeek>
}

impl DaysOfWeek
{
    pub fn new(days: Vec<DayOfWeek>) -> Self
    {
        return Self { days };
    }
}

/// serializable enum containing the twelve gregorian calendar names
#[derive(Debug, Serialize, Deserialize)]
pub enum Month
{
    January,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December
}

/// alias for `u8` representing the numerical day of the month (i.e. 24th, 1st, 13th)
pub type DayOfMonth = u8;

/// wrapper struct for serialization purposes of `Vec<u8>` 
#[derive(Debug, Serialize, Deserialize)]
pub struct DaysOfMonth
{
    pub days: Vec<DayOfMonth>
}

impl DaysOfMonth
{
    pub fn new(days: Vec<DayOfMonth>) -> Self
    {
        return Self { days };
    }
}

/// alias for `u64` to represent (pretty much) any positive year numerically
pub type Year = u64;

// --------
// - time -
// --------

/// alias for `u8` representing a numerical hour in 24-hour time (i.e. 2:xx, 14:xx)
pub type Hour = u8;

/// alias for `u8` representing a numerical minute (i.e. x:08, x:51)
pub type Minute = u8;

/// struct to represent a time in the format `hour:minute` where `hour` and `minute` are `u8`s
#[derive(Debug, Serialize, Deserialize)]
pub struct Time
{
    pub hour: Hour,
    pub minute: Minute
}

impl Time
{
    pub fn new(hour: Hour, minute: Minute) -> Self
    {
        return Self { hour, minute };
    }
}

// -----------------
// - point in time -
// -----------------

/// struct that represents an exact point in time (a year, a month, a numerical day of the month, and a time)
#[derive(Debug, Serialize, Deserialize)]
pub struct PointInTime
{
    pub year: Year,
    pub month: Month,
    pub day_of_month: DayOfMonth,
    pub time: Time
}

impl PointInTime
{
    pub fn new(year: Year, month: Month, day_of_month: DayOfMonth, time: Time) -> Self
    {
        return Self { year, month, day_of_month, time };
    }
}

/// struct that represents a period of time aka a range of two `PointInTime`s
#[derive(Debug, Serialize, Deserialize)]
pub struct PeriodOfTime
{
    pub start: PointInTime,
    pub end: PointInTime
}

impl PeriodOfTime
{
    pub fn new(start: PointInTime, end: PointInTime) -> Self
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
