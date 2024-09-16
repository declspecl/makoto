import { DayOfWeek, Month } from "@backend/dayTime";

/**
 * Converts a `Month` into the index of the numerical representation of the `Month` in the gregorian calendar, 0-11
 * @param {Month} month The `Month` to be converted into a number. ex. "January", "February", etc
 * @returns {number} The numerical index 0-11 of the `Month`
 */
export function getMonthIndexFromMonth(month: Month): number {
    switch (month) {
        case "January": return 0;
        case "February": return 1;
        case "March": return 2;
        case "April": return 3;
        case "May": return 4;
        case "June": return 5;
        case "July": return 6;
        case "August": return 7;
        case "September": return 8;
        case "October": return 9;
        case "November": return 10;
        case "December": return 11;
        default: throw new Error("Invalid month value");
    }
}

/**
 * Converts the numerical representation index of a `Month` 0-11 into a `Month`
 * @param {number} month The index representing the `Month` 0-11
 * @returns {Month} The corresponding `Month`, ex. "January", "February", etc
 */
export function getMonthFromMonthIndex(month: number): Month {
    switch (month) {
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
        default: throw new Error("Invalid month number");
    }
}

/**
 * Converts a `DayOfWeek` into the numerical representation of a `DayOfWeek`, 1-7
 * @param {DayOfWeek} day The `DayOfWeek` to be converted
 * @returns {number} The corresponding number mapping to the given `DayOfWeek`
 */
export function getDayNumberFromDayOfWeek(day: DayOfWeek): number {
    switch (day) {
        case "Sunday": return 1;
        case "Monday": return 2;
        case "Tuesday": return 3;
        case "Wednesday": return 4;
        case "Thursday": return 5;
        case "Friday": return 6;
        case "Saturday": return 7;
        default: throw new Error("Invalid day of week value");
    }
}

/**
 * Converts the numerical representation of a `DayOfWeek` 1-7 into a `DayOfWeek`
 * @param {number} day The number representing the day, 1-7, mapping to Sunday-Saturday
 * @returns {DayOfWeek} The corresponding `DayOfWeek`. ex. "Sunday", "Monday", etc
 */
export function getDayOfWeekFromDayNumber(day: number): DayOfWeek {
    switch (day) {
        case 1: return "Sunday";
        case 2: return "Monday";
        case 3: return "Tuesday";
        case 4: return "Wednesday";
        case 5: return "Thursday";
        case 6: return "Friday";
        case 7: return "Saturday";
        default: throw new Error("Invalid day value");
    }
}
