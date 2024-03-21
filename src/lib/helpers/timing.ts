import { getRange } from "../utils";
import { getMonthIndexFromMonth } from "./conversions";
import { PeriodOfTime, PointInTime, Time } from "@/backend/dayTime";

/**
 * Checks whether a given `PointInTime` object is contained inside a given `PeriodOfTime` object
 * @param {PointInTime} pointInTime The `PointInTime` that will be checked if it is in the given `PeriodOfTime`
 * @param {PeriodOfTime} periodOfTime The `PeriodOfTime` that will be checked if it envelopes the given `PointInTime`
 * @returns {boolean} Whether `pointInTime` is in `PeriodOfTime` or not
 */
export function isPointInTimeInPeriodOfTime(pointInTime: PointInTime, periodOfTime: PeriodOfTime): boolean {
    if (pointInTime.year < periodOfTime.start.year || pointInTime.year > periodOfTime.end.year) return false;

    // TODO: this is problematic. if the period of time is 2021-2023, we should only check the month, day, hour, and minute
    // if the preceding value is exactly equal.
    // example:
    //  pointInTime is january 2022
    //  periodOfTime spans from january 2021 to january 2023
    // since pointInTime's year is in the bounds of periodOfTime without touching them, we dont need to check anything else
    //
    // example:
    //  pointInTime is january 10th 2021 at 14:30
    //  periodOfTime is from january 10th 2021 00:00 to january 11th 2023 at 23:59
    // pointInTime is within the year bounds, but its touching, so lets check month
    // pointInTime is within the month bounds, but its touching, so lets check day
    // pointInTime is within the day bounds, but its touching, so lets check hour
    // pointInTime is within hour bounds, without touching, so we can confirm its in the bounds

    if (getMonthIndexFromMonth(pointInTime.month) < getMonthIndexFromMonth(periodOfTime.start.month) ||
        getMonthIndexFromMonth(pointInTime.month) > getMonthIndexFromMonth(periodOfTime.end.month)) return false;
    if (pointInTime.day_of_month < periodOfTime.start.day_of_month || pointInTime.day_of_month > periodOfTime.end.day_of_month) return false;
    if (pointInTime.time.hour < periodOfTime.start.time.hour || pointInTime.time.hour > periodOfTime.end.time.hour) return false;
    if (pointInTime.time.minute < periodOfTime.start.time.minute || pointInTime.time.minute > periodOfTime.end.time.minute) return false;

    return true;
}

/**
 * Creates a new `Date` object that directly models a given `PoinInTIme`
 * @param {PointInTime} pointInTime The `PointInTime` that will be represented by a new `Date` object
 * @returns {Date} The representative `Date` object of the given `PointInTime`
 */
export function getDateObjectFromPointInTime(pointInTime: PointInTime): Date {
    return new Date(
        pointInTime.year,
        getMonthIndexFromMonth(pointInTime.month),
        pointInTime.day_of_month,
        pointInTime.time.hour,
        pointInTime.time.minute
    );
}

/**
 * Retrieves the number of days in a given month (index) in a given year
 * @param {number} year The year that the month is in
 * @param {number} monthIndex The ***index*** of the month 0-11 inclusively to retrieve the number of days of
 * @returns {number} The number of days in the supplied month in the supplied year
 */
export function getNumberOfDaysInMonth(year: number, monthIndex: number): number {
    // underflow the month AHEAD to fall back into CORRECT month at the final day
    return (new Date(year, monthIndex + 1, 0)).getDate();
}

/**
 * Retrieves the days from the preceding month that lead up to the 1st of a given month. For example, if the 1st of May is a Thursday, and weeks start on Sunday, this function would return the numerical days for the previous month's Sunday, Monday, Tuesday, and Wednesday.
 * @param {number} year The year that the month is in
 * @param {number} monthIndex The ***index*** of the month 0-11 inclusively to retrieve the amount of leading days (that belong to the previous month)
 * @returns {number[]} The list of the day numbers that belong to the previous month that lead up to the 1st of the supplied month
 */
export function getLeadingDaysForMonth(year: number, monthIndex: number): number[] {
    let dayOfWeekNumber: number = (new Date(year, monthIndex)).getDay(); // 0-6
    let lastDayOfPrecedingMonth: number = getNumberOfDaysInMonth(year, monthIndex - 1); // 1-31

    return getRange(lastDayOfPrecedingMonth - dayOfWeekNumber + 1, lastDayOfPrecedingMonth);
}

/**
 * Returns a `Time` object from a string in the format of hh:mm
 * @param {string} time The time string in hh:mm format to be parsed into a `Time` object
 * @returns {Time} The `Time` object that represents the supplied time string
 */
export function getTimeFromString(time: string): Time {
    const [strHour, strMinute] = time.split(":")

    try {
        const hour = parseInt(strHour);
        const minute = parseInt(strMinute);

        return {
            hour,
            minute
        };
    }
    catch (e) {
        console.error(e);

        throw e;
    }
}
