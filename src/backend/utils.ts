import { useMakotoStateContext } from "@/contexts/MakotoStateContext";
import { PartitionRule, RawPartition } from "./model/partition";
import { DayOfMonth, Month, PeriodOfTime, PointInTime } from "./model/dayTime";
import { ActivationQuery } from "./model/activation";

export function monthToMonthNumber(month: Month): number {
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

export function isPointInTimeInPeriodOfTime(time: PointInTime, periodOfTime: PeriodOfTime): boolean {
    if (time.year < periodOfTime.start.year || time.year > periodOfTime.end.year) return false;
    if (monthToMonthNumber(time.month) < monthToMonthNumber(periodOfTime.start.month) ||
        monthToMonthNumber(time.month) > monthToMonthNumber(periodOfTime.end.month)) return false;
    if (time.day_of_month < periodOfTime.start.day_of_month || time.day_of_month > periodOfTime.end.day_of_month) return false;
    if (time.time.hour < periodOfTime.start.time.hour || time.time.hour > periodOfTime.end.time.hour) return false;
    if (time.time.minute < periodOfTime.start.time.minute || time.time.minute > periodOfTime.end.time.minute) return false;

    return true;
}

export function checkPartitionRuleActivationQuery(pointInTime: PointInTime, activationQuery: ActivationQuery): boolean {
    switch (activationQuery.tag) {
        case "OnDaysOfWeek": {
            // return pointInTime.day_of_month
            // TODO: implement a `getDayOfWeekFromDayOfMonth`, maybe from `PointInTime`
            // TODO: i think it might be best to separate `PeriodOfTime` from `ActivationQuery` and add `active_period_of_time` as a member
            break;
        }
        case "OnDaysOfMonth": {
            break;
        }
        case "InPeriodOfTime": {
            return isPointInTimeInPeriodOfTime(pointInTime, (activationQuery as PeriodOfTime));
        }
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
        
    }

    return applicablePartitions;
}
