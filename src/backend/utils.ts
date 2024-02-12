import { useMakotoStateContext } from "@/contexts/MakotoStateContext";
import { PartitionRule, RawPartition } from "./model/partition";
import { DayOfWeek, Month, PeriodOfTime, PointInTime } from "./model/dayTime";

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

// export function checkPartitionRuleActivationQuery(pointInTime: PointInTime, activationQuery: ActivationQuery): boolean {
//     switch (activationQuery.tag) {
//         case "OnDaysOfWeek": {
//             // TODO: implement a `getDayOfWeekFromDayOfMonth`, maybe from `PointInTime`
//             pointInTime.time
//             // approach:
//             // 1. check if in activation query for each day
//             // 2. create list of all days that are valid from a , and check if each day is in it
//             break;
//         }
//         case "OnDaysOfMonth": {
//             break;
//         }
//         case "InPeriodOfTime": {
//             return isPointInTimeInPeriodOfTime(
//                 pointInTime,
//                 {
//                     start: activationQuery.start,
//                     end: activationQuery.end
//                 }
//             );
//         }
//     }
// }

export function isPartitionRuleActiveAtPointInTime(partition: PartitionRule, pointInTime: PointInTime): boolean {
    switch (partition.query.tag) {
        case "OnDaysOfMonth":
            return pointInTime.day_of_month in partition.query.days;

        case "OnDaysOfWeek":
            const date = getDateObjectFromPointInTime(pointInTime);
            const dayOfWeek = getDayOfWeekFromDayNumber(date.getDay() + 1);

            return dayOfWeek in partition.query.days;
    }
}

export function getApplicablePartitionsForPointInTime(pointInTime: PointInTime): (RawPartition | PartitionRule)[] {
    const makotoState = useMakotoStateContext();
    if (makotoState.state === null) return [];

    const applicablePartitions: (RawPartition | PartitionRule)[] = [];

    for (let rawPartition of makotoState.state.data.raw_partitions) {
        if (isPointInTimeInPeriodOfTime(pointInTime, rawPartition.period_of_time)) {
            applicablePartitions.push(rawPartition);
        }
    }

    for (let partitionRule of makotoState.state.data.partition_rules) {
        if (isPartitionRuleActiveAtPointInTime(partitionRule, pointInTime)) {
            applicablePartitions.push(partitionRule);
        }
    }

    return applicablePartitions;
}
