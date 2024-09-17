use serde::{Deserialize, Serialize};

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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DaysOfWeek {
	pub days: Vec<DayOfWeek>
}

impl DaysOfWeek {
	pub fn new(days: Vec<DayOfWeek>) -> Self {
		return Self { days };
	}
}

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

pub type DayOfMonth = u8;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DaysOfMonth {
	pub days: Vec<DayOfMonth>
}

impl DaysOfMonth {
	pub fn new(days: Vec<DayOfMonth>) -> Self {
		return Self { days };
	}
}

pub type Year = u64;
pub type Minute = u8;
pub type Hour = u8;

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
