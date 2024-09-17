export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

export interface CalendarInfo {
    targetMonthNumber: number;
    targetYear: number;
    viewMode: CalendarViewMode;
}
