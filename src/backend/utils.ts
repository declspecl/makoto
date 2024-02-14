import { ErrorfulMakotoState, useMakotoStateContext } from "@/contexts/MakotoStateContext";
import { PartitionRule, RawPartition } from "./model/partition";
import { DayOfWeek, Month, PeriodOfTime, PointInTime } from "./model/dayTime";
import { MakotoState } from "./model/state";


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

export function isPartitionRuleActiveAtPointInTime(partition: PartitionRule, pointInTime: PointInTime): boolean {
    switch (partition.query.tag) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(pointInTime.day_of_month);

        // converting to Date object to easily know the day of the week
        case "OnDaysOfWeek":
            const pointInTimeDate = getDateObjectFromPointInTime(pointInTime);
            const pointInTimeDayOfWeek = getDayOfWeekFromDayNumber(pointInTimeDate.getDay() + 1);

            return partition.query.days.includes(pointInTimeDayOfWeek);
    }
}

export function getApplicablePartitionsForPointInTime(makotoState: MakotoState, pointInTime: PointInTime): (RawPartition | PartitionRule)[] {
    const applicablePartitions: (RawPartition | PartitionRule)[] = [];

    for (let rawPartition of makotoState.data.raw_partitions) {
        if (isPointInTimeInPeriodOfTime(pointInTime, rawPartition.period_of_time)) {
            applicablePartitions.push(rawPartition);
        }
    }

    for (let partitionRule of makotoState.data.partition_rules) {
        if (isPartitionRuleActiveAtPointInTime(partitionRule, pointInTime)) {
            applicablePartitions.push(partitionRule);
        }
    }

    return applicablePartitions;
}

export function getNumberOfDaysInMonth(year: number, month: number): number {
    return (new Date(year, month, 0)).getDate();
}
