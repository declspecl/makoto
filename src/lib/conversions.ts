import { DayOfWeek, Month, PointInTime } from "@/backend/model/dayTime";
import { PreciseDay } from "@/model/dayTime";

export function convertMonthToMonthNumber(month: Month): number {
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
        default: throw new Error(`Invalid month value ${month}`);
    }
}

export function convertMonthNumberToMonth(monthNumber: number): Month {
    switch (monthNumber) {
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
        default: throw new Error(`Invalid month number ${monthNumber}. Must be between 1 and 12`);
    }
}

export function convertDayOfWeekToDayNumber(day: DayOfWeek): number {
    switch (day) {
        case "Sunday": return 1;
        case "Monday": return 2;
        case "Tuesday": return 3;
        case "Wednesday": return 4;
        case "Thursday": return 5;
        case "Friday": return 6;
        case "Saturday": return 7;
        default: throw new Error(`Invalid day of week number ${day}. Must be between 1 and 7`);
    }
}

export function convertDayNumberToDayOfWeek(dayNumber: number): DayOfWeek {
    switch (dayNumber) {
        case 1: return "Sunday";
        case 2: return "Monday";
        case 3: return "Tuesday";
        case 4: return "Wednesday";
        case 5: return "Thursday";
        case 6: return "Friday";
        case 7: return "Saturday";
        default: throw new Error(`Invalid day number ${dayNumber}`);
    }
}

export function convertPointInTimeToDate(pointInTime: PointInTime): Date {
    return new Date(
        pointInTime.year,
        convertMonthToMonthNumber(pointInTime.month) - 1,
        pointInTime.day_of_month,
        pointInTime.time.hour,
        pointInTime.time.minute
    );
}

export function convertDateToPointInTime(date: Date): PointInTime {
    return {
        year: date.getFullYear(),
        month: convertMonthNumberToMonth(date.getMonth() + 1),
        day_of_month: date.getDate(),
        time: {
            hour: date.getHours(),
            minute: date.getMinutes()
        }
    };
}

export function convertPreciseDayToDate(preciseDay: PreciseDay): Date {
    return new Date(preciseDay.year, preciseDay.monthNumber - 1, preciseDay.dayOfMonth);
}