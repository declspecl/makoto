export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

export interface CalendarInfo {
    today: Date,
    viewMode: CalendarViewMode
}
