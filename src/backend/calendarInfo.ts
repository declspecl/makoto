import { DayOfMonth, Month, Year } from "./model/dayTime";

export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

export interface CalendarInfo {
    year: Year,
    month: Month,
    dayOfMonth: DayOfMonth,
    viewMode: CalendarViewMode
}
