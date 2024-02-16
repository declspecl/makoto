import { MakotoState } from "@/backend/state";
import { DayOfWeek, PointInTime } from "@/backend/dayTime";
import { getDayOfWeekFromDayNumber, getMonthIndexFromMonth } from "./conversions";
import { PartitionRule, RawPartition } from "@/backend/partition";
import { getDateObjectFromPointInTime, isPointInTimeInPeriodOfTime } from "./timing";

export function isRawPartitionActiveOnDay(partition: RawPartition, year: number, monthIndex: number, dayOfMonth: number): boolean {
    if (year < partition.period_of_time.start.year || year > partition.period_of_time.end.year) return false;
    if (monthIndex + 1 < getMonthIndexFromMonth(partition.period_of_time.start.month) ||
        monthIndex + 1 > getMonthIndexFromMonth(partition.period_of_time.end.month)) return false;
    if (dayOfMonth < partition.period_of_time.start.day_of_month || dayOfMonth > partition.period_of_time.end.day_of_month) return false;

    return true;
}

export function isPartitionRuleActiveAtPointInTime(partition: PartitionRule, pointInTime: PointInTime): boolean {
    switch (partition.query.tag) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(pointInTime.day_of_month);

        // converting to Date object to easily know the day of the week
        case "OnDaysOfWeek":
            const pointInTimeDate: Date = getDateObjectFromPointInTime(pointInTime);
            const pointInTimeDayOfWeek: DayOfWeek = getDayOfWeekFromDayNumber(pointInTimeDate.getDay() + 1);

            return partition.query.days.includes(pointInTimeDayOfWeek);
    }
}

export function isPartitionRuleActiveOnDay(partition: PartitionRule, year: number, monthIndex: number, dayOfMonth: number): boolean {
    switch (partition.query.tag) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(dayOfMonth);

        // converting to Date object to easily know the day of the week
        case "OnDaysOfWeek":
            const pointInTimeDate: Date = new Date(year, monthIndex, dayOfMonth);
            const pointInTimeDayOfWeek: DayOfWeek = getDayOfWeekFromDayNumber(pointInTimeDate.getDay() + 1);

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

export function getApplicablePartitionsForDay(makotoState: MakotoState, year: number, monthIndex: number, dayOfMonth: number): (RawPartition | PartitionRule)[] {
    const applicablePartitions: (RawPartition | PartitionRule)[] = [];

    for (let rawPartition of makotoState.data.raw_partitions) {
        if (isRawPartitionActiveOnDay(rawPartition, year, monthIndex, dayOfMonth)) {
            applicablePartitions.push(rawPartition);
        }
    }

    for (let partitionRule of makotoState.data.partition_rules) {
        if (isPartitionRuleActiveOnDay(partitionRule, year, monthIndex, dayOfMonth)) {
            applicablePartitions.push(partitionRule);
        }
    }

    return applicablePartitions;
}
