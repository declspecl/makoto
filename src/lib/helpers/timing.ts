import { getMonthNumberFromMonth } from "./conversions";
import { PeriodOfTime, PointInTime } from "@/backend/model/dayTime";

export function isPointInTimeInPeriodOfTime(pointInTime: PointInTime, periodOfTime: PeriodOfTime): boolean {
    if (pointInTime.year < periodOfTime.start.year || pointInTime.year > periodOfTime.end.year) return false;
    if (getMonthNumberFromMonth(pointInTime.month) < getMonthNumberFromMonth(periodOfTime.start.month) ||
        getMonthNumberFromMonth(pointInTime.month) > getMonthNumberFromMonth(periodOfTime.end.month)) return false;
    if (pointInTime.day_of_month < periodOfTime.start.day_of_month || pointInTime.day_of_month > periodOfTime.end.day_of_month) return false;
    if (pointInTime.time.hour < periodOfTime.start.time.hour || pointInTime.time.hour > periodOfTime.end.time.hour) return false;
    if (pointInTime.time.minute < periodOfTime.start.time.minute || pointInTime.time.minute > periodOfTime.end.time.minute) return false;

    return true;
}

export function getDateObjectFromPointInTime(pointInTime: PointInTime): Date {
    return new Date(
        pointInTime.year,
        getMonthNumberFromMonth(pointInTime.month) - 1,
        pointInTime.day_of_month,
        pointInTime.time.hour,
        pointInTime.time.minute
    );
}

export function getNumberOfDaysInMonth(year: number, month: number): number {
    return (new Date(year, month, 0)).getDate();
}
