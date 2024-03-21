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
    // pointInTime is definitely outside of the periodOfTime by year
    if (pointInTime.year < periodOfTime.start.year || pointInTime.year > periodOfTime.end.year) return false;

    // periodOfTime covers 3+ unique years, pointInTime is in that range without touching ends
    if (pointInTime.year > periodOfTime.start.year && pointInTime.year < periodOfTime.end.year) return true;

    const getTotalMinutesOfPointInTime = (pit: PointInTime): number => {
        const minutesInDay = 1440;

        let leadingMonthMinutes = 0;

        for (let monthIndex of getRange(0, getMonthIndexFromMonth(pit.month) - 1)) {
            const numOfDaysInMonth = getNumberOfDaysInMonth(pit.year, monthIndex);

            leadingMonthMinutes += numOfDaysInMonth * minutesInDay;
        }

        const leadingDayMinutes = ((pit.day_of_month - 1) * minutesInDay);
        const leadingHourMinutes = pit.time.hour * 60;

        return leadingMonthMinutes + leadingDayMinutes + leadingHourMinutes + pit.time.minute;
    }

    const pointInTimeMinutes = getTotalMinutesOfPointInTime(pointInTime);
    const periodOfTimeStartMinutes = getTotalMinutesOfPointInTime(periodOfTime.start);
    const periodOfTimeEndMinutes = getTotalMinutesOfPointInTime(periodOfTime.end);

    // DEBUG
    // console.log(pointInTimeMinutes);
    // console.log(periodOfTimeStartMinutes);
    // console.log(periodOfTimeEndMinutes);

    // periodOfTime spans the same year and pointInTime is in that year
    if (pointInTime.year == periodOfTime.start.year && periodOfTime.start.year == periodOfTime.end.year)
        return pointInTimeMinutes >= periodOfTimeStartMinutes && pointInTimeMinutes <= periodOfTimeEndMinutes;

    // periodOfTime spans 2+ unique years, pointInTime is the first year
    if (pointInTime.year == periodOfTime.start.year && periodOfTime.start.year < periodOfTime.end.year)
        return pointInTimeMinutes >= periodOfTimeStartMinutes;

    // periodOfTime spans 2+ unique years, pointInTime is the last year
    if (pointInTime.year == periodOfTime.end.year && periodOfTime.start.year < periodOfTime.start.year)
        return pointInTimeMinutes <= periodOfTimeEndMinutes;

    return false;
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
