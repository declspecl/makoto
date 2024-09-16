use serde::{Deserialize, Serialize};

// -------------------------
// - date based structures -
// -------------------------

/// serializable enum to represent the names of the days of the week
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum DayOfWeek {
	Sunday,
	Monday,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday
}

/// wrapper struct for serialization purposes of `Vec<DayOfWeek>`
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DaysOfWeek {
	pub days: Vec<DayOfWeek>
}

impl DaysOfWeek {
	pub fn new(days: Vec<DayOfWeek>) -> Self {
		return Self { days };
	}
}

/// serializable enum containing the twelve gregorian calendar names
#[derive(Debug, Serialize, Deserialize, Clone)]
pub enum Month {
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
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DaysOfMonth {
	pub days: Vec<DayOfMonth>
}

impl DaysOfMonth {
	pub fn new(days: Vec<DayOfMonth>) -> Self {
		return Self { days };
	}
}

/// alias for `u64` to represent (pretty much) any positive year numerically
pub type Year = u64;

// -------------------------
// - time based structures -
// -------------------------

/// alias for `u8` representing a numerical minute (i.e. x:08, x:51)
pub type Minute = u8;

/// alias for `u8` representing a numerical hour in 24-hour time (i.e. 2:xx, 14:xx)
pub type Hour = u8;

/// struct to represent a time in the format `hour:minute` where `hour` and `minute` are `u8`s
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Time {
	pub hour: Hour,
	pub minute: Minute
}

impl Time {
	pub fn new(
		hour: Hour,
		minute: Minute
	) -> Self {
		return Self { hour, minute };
	}
}

// -----------------
// - point in time -
// -----------------

/// struct that represents an exact point in time (a year, a month, a numerical day of the month, and a time)
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PointInTime {
	pub year: Year,
	pub month: Month,
	pub day_of_month: DayOfMonth,
	pub time: Time
}

impl PointInTime {
	pub fn new(
		year: Year,
		month: Month,
		day_of_month: DayOfMonth,
		time: Time
	) -> Self {
		return Self {
			year,
			month,
			day_of_month,
			time
		};
	}
}

/// struct that represents a period of time aka a range of two `PointInTime`s
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PeriodOfTime {
	pub start: PointInTime,
	pub end: PointInTime
}

impl PeriodOfTime {
	pub fn new(
		start: PointInTime,
		end: PointInTime
	) -> Self {
		return Self { start, end };
	}
}

// --------------
// - unit tests -
// --------------

/// serialization unit tests for `crate::model::day_time`
#[cfg(test)]
mod serialization_tests {
	use super::*;

	use serde_json::json;

	// ---------------------
	// - day related tests -
	// ---------------------

	/// ensures correct json serialization of the `DayOfWeek` enum
	#[test]
	fn day_of_week() {
		assert_eq!(json!(DayOfWeek::Sunday), r#"Sunday"#);
	}

	/// ensures correct json serialization of the `DaysOfWeek` struct
	#[test]
	fn days_of_week() {
		assert_eq!(
			json!(DaysOfWeek::new(vec![
				DayOfWeek::Monday,
				DayOfWeek::Tuesday
			]))
			.to_string(),
			r#"
            {
                "days": [
                    "Monday",
                    "Tuesday"
                ]
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}

	/// ensures correct json serialization of the `Month` enum
	#[test]
	fn month() {
		assert_eq!(json!(Month::February), r#"February"#);
	}

	/// ensures correct json serialization of the `DaysOfMonth` struct
	#[test]
	fn days_of_month() {
		assert_eq!(
			json!(DaysOfMonth::new(vec![1, 31])).to_string(),
			r#"
            {
                "days": [
                    1,
                    31
                ]
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}

	// ----------------------
	// - time related tests -
	// ----------------------

	/// ensures correct json serialization of the `Time` struct
	#[test]
	fn time() {
		assert_eq!(
			json!(Time::new(0, 0)).to_string(),
			r#"
            {
                "hour": 0,
                "minute": 0
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}

	/// ensures correct json serialization of the `PointInTime` struct
	#[test]
	fn point_in_time() {
		assert_eq!(
			json!(PointInTime::new(
				2024,
				Month::January,
				23,
				Time::new(16, 46)
			))
			.to_string(),
			r#"
            {
                "day_of_month": 23,
                "month": "January",
                "time": {
                    "hour": 16,
                    "minute": 46
                },
                "year": 2024
            }
            "#
			.replace(" ", "")
			.replace("\n", "")
		);
	}
}
