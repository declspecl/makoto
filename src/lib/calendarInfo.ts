/**
 * The possible view modes for the Calendar page:
 * Weekly: Displays 7 days each week, 0-24 hours each, highly detailed partition previews per day
 * Monthly: Displays all 31 days, small partition previews per day are displayed
 * Yearly: Displays all 12 months, no partition detail displayed
 */
export enum CalendarViewMode {
    Weekly,
    Monthly,
    Yearly
}

/**
 * The data containing information about what the Calendar page should be showing
 * @interface CalendarInfo
 * @field {number} targetMonthIndex The index of the month that should be currently displayed
 * @field {number} targetYear The year number that should be currently displayed
 * @field {CalendarViewMode} viewMode The `CalendarViewMode` view mode, Weekly, Monthly, or Yearly, that is currently selected
 */
export interface CalendarInfo {
    targetMonthIndex: number;
    targetYear: number;
    viewMode: CalendarViewMode;
}
