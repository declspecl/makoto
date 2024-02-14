export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

export interface CalendarInfo {
    targetMonth: number,
    targetYear: number,
    viewMode: CalendarViewMode
}
