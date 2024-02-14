export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

export interface CalendarInfo {
    targetMonthIndex: number,
    targetYear: number,
    viewMode: CalendarViewMode
}
