// -------
// - day -
// -------
export type Day = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export interface DaysOfWeek {
    days: Day[]
}

export interface DaysOfMonth {
    days: number[]
}

// --------
// - time -
// --------
export interface Time {
    hour: number,
    minute: number
}

export interface TimeRange {
    start: Time,
    end: Time
}