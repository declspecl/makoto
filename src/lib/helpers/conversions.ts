import { DayOfWeek, Month } from "@/backend/model/dayTime";

/**
 * Converts a `Month` into the numerical representation of the `Month` in the gregorian calendar, 1-12
 * @param {Month} month The `Month` to be converted into a number. ex. "January", "February", etc
 * @returns {number} The numerical representation 1-12 of the `Month`
 */
export function getMonthNumberFromMonth(month: Month): number {
    switch (month) {
        case "January": return 1;
        case "February": return 2;
        case "March": return 3;
        case "April": return 4;
        case "May": return 5;
        case "June": return 6;
        case "July": return 7;
        case "August": return 8;
        case "September": return 9;
        case "October": return 10;
        case "November": return 11;
        case "December": return 12;
        default: throw new Error("Invalid month value");
    }
}

/**
 * Converts the numerical representation of a `Month` 1-12 into a `Month`
 * @param {number} month The number representing the `Month`
 * @returns {Month} The corresponding `Month`, ex. "January", "February", etc
 */
export function getMonthFromMonthNumber(month: number): Month {
    switch (month) {
        case 1: return "January";
        case 2: return "February";
        case 3: return "March";
        case 4: return "April";
        case 5: return "May";
        case 6: return "June";
        case 7: return "July";
        case 8: return "August";
        case 9: return "September";
        case 10: return "October";
        case 11: return "November";
        case 12: return "December";
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
