import { generateRange } from "@lib/utils";
import { convertPointInTimeToDate } from "@lib/conversions";
import { PeriodOfTime, PointInTime } from "@/backend/model/dayTime";

export function isPointInTimeInPeriodOfTime(pointInTime: PointInTime, periodOfTime: PeriodOfTime): boolean {
    const pointInTimeDate = convertPointInTimeToDate(pointInTime);
    const periodOfTimeStartDate = convertPointInTimeToDate(periodOfTime.start);
    const periodOfTimeEndDate = convertPointInTimeToDate(periodOfTime.end);

    return pointInTimeDate >= periodOfTimeStartDate && pointInTimeDate <= periodOfTimeEndDate;
}

export function getNumberOfDaysInMonth(year: number, monthNumber: number): number {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error(`Invalid month number ${monthNumber}. Must be between 1 and 12`);
    }

    // Date constructor expects monthIndex (0-11), but we give it monthNumber, so we are a month ahead
    // Date constructor expects date (1-31), but we give it 0, so it gives us the last day of the previous month
    // and since we are already a month ahead, we get the last day of the month we want
    return (new Date(year, monthNumber, 0)).getDate();
}

export function getPreviousMonthDayNumbersInWeekOfNewMonthStart(year: number, monthNumber: number): number[] {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error(`Invalid month number ${monthNumber}. Must be between 1 and 12`);
    }

    const lastDayOfPrecedingMonth = getNumberOfDaysInMonth(year, monthNumber - 1);
    const newMonthStartingDayOfWeekNumber = (new Date(year, monthNumber - 1, 1)).getDay() + 1;

    if (newMonthStartingDayOfWeekNumber === 1) {
        return [];
    }

    const inclusiveEndpointOffset = 2;

    return generateRange(
        (lastDayOfPrecedingMonth - newMonthStartingDayOfWeekNumber) + inclusiveEndpointOffset,
        lastDayOfPrecedingMonth
    );
}

export function getNextMonthNumberAndYear(monthNumber: number, year: number): [number, number] {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error(`Invalid month number ${monthNumber}. Must be between 1 and 12`);
    }

    if (monthNumber === 12) {
        return [1, year + 1];
    }

    return [monthNumber + 1, year];
}

export function getPreviousMonthNumberAndYear(monthNumber: number, year: number): [number, number] {
    if (monthNumber < 1 || monthNumber > 12) {
        throw new Error(`Invalid month number ${monthNumber}. Must be between 1 and 12`);
    }

    if (monthNumber === 0) {
        return [11, year - 1];
    }

    return [monthNumber - 1, year];
}
