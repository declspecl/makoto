import { getRange } from "../utils";
import { getMonthIndexFromMonth } from "./conversions";
import { PeriodOfTime, PointInTime, Time } from "@/backend/dayTime";

/**
 * @param {PointInTime} pointInTime The `PointInTime` that will be checked if it is in the given `PeriodOfTime`
 * @param {PeriodOfTime} periodOfTime The `PeriodOfTime` that will be checked if it envelopes the given `PointInTime`
 * @returns {boolean} Whether `pointInTime` is in `PeriodOfTime` or not
 */
export function isPointInTimeInPeriodOfTime(pointInTime: PointInTime, periodOfTime: PeriodOfTime): boolean {
    if (pointInTime.year < periodOfTime.start.year || pointInTime.year > periodOfTime.end.year) return false;
    if (getMonthIndexFromMonth(pointInTime.month) < getMonthIndexFromMonth(periodOfTime.start.month) ||
        getMonthIndexFromMonth(pointInTime.month) > getMonthIndexFromMonth(periodOfTime.end.month)) return false;
    if (pointInTime.day_of_month < periodOfTime.start.day_of_month || pointInTime.day_of_month > periodOfTime.end.day_of_month) return false;
    if (pointInTime.time.hour < periodOfTime.start.time.hour || pointInTime.time.hour > periodOfTime.end.time.hour) return false;
    if (pointInTime.time.minute < periodOfTime.start.time.minute || pointInTime.time.minute > periodOfTime.end.time.minute) return false;

    return true;
}

export function getDateObjectFromPointInTime(pointInTime: PointInTime): Date {
    return new Date(
        pointInTime.year,
        getMonthIndexFromMonth(pointInTime.month),
        pointInTime.day_of_month,
        pointInTime.time.hour,
        pointInTime.time.minute
    );
}

export function getNumberOfDaysInMonth(year: number, monthIndex: number): number {
    // underflow the month AHEAD to fall back into CORRECT month at the final day
    return (new Date(year, monthIndex + 1, 0)).getDate();
}

export function getLeadingDaysForMonth(year: number, monthIndex: number): number[] {
    let dayOfWeekNumber: number = (new Date(year, monthIndex)).getDay(); // 0-6
    let lastDayOfPrecedingMonth: number = getNumberOfDaysInMonth(year, monthIndex - 1); // 1-31

    return getRange(lastDayOfPrecedingMonth - dayOfWeekNumber + 1, lastDayOfPrecedingMonth);
}

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
