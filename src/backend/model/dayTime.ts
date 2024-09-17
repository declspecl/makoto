export type DayOfWeek = "Sunday"
                      | "Monday"
                      | "Tuesday"
                      | "Wednesday"
                      | "Thursday"
                      | "Friday"
                      | "Saturday";

export interface DaysOfWeek {
    days: DayOfWeek[]
}

export type Month = "January"
                  | "February"
                  | "March"
                  | "April"
                  | "May"
                  | "June"
                  | "July"
                  | "August"
                  | "September"
                  | "October"
                  | "November"
                  | "December";

export type DayOfMonth = number;

export interface DaysOfMonth {
    days: DayOfMonth[]
}

export type Year = number;
export type Minute = number;
export type Hour = number;

export interface Time {
    hour: Hour,
    minute: Minute
}

export interface PointInTime {
    year: Year,
    month: Month,
    day_of_month: DayOfMonth,
    time: Time
}

export interface PeriodOfTime {
    start: PointInTime,
    end: PointInTime
}