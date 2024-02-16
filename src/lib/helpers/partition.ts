import { MakotoState } from "@/backend/state";
import { DayOfWeek, PointInTime } from "@/backend/dayTime";
import { getDayOfWeekFromDayNumber, getMonthIndexFromMonth } from "./conversions";
import { PartitionRule, RawPartition } from "@/backend/partition";
import { getDateObjectFromPointInTime, isPointInTimeInPeriodOfTime } from "./timing";

interface PreciseDay {
    year: number,
    monthIndex: number,
    dayOfMonth: number
}

export function isRawPartitionActiveOnDay(partition: RawPartition, exactDay: PreciseDay): boolean {
    if (exactDay.year < partition.period_of_time.start.year || exactDay.year > partition.period_of_time.end.year) return false;
    if (exactDay.monthIndex < getMonthIndexFromMonth(partition.period_of_time.start.month) ||
        exactDay.monthIndex > getMonthIndexFromMonth(partition.period_of_time.end.month)) return false;
    if (exactDay.dayOfMonth < partition.period_of_time.start.day_of_month || exactDay.dayOfMonth > partition.period_of_time.end.day_of_month) return false;

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

export function isPartitionRuleActiveOnDay(partition: PartitionRule, exactDay: PreciseDay): boolean {
    switch (partition.query.tag) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(exactDay.dayOfMonth);

        // converting to Date object to easily know the day of the week
        case "OnDaysOfWeek":
            const pointInTimeDate: Date = new Date(exactDay.year, exactDay.monthIndex, exactDay.dayOfMonth);
            const pointInTimeDayOfWeek: DayOfWeek = getDayOfWeekFromDayNumber(pointInTimeDate.getDay() + 1);

            return partition.query.days.includes(pointInTimeDayOfWeek);
    }
}

export function getAllActivePartitionsAtPointInTime(makotoState: MakotoState, pointInTime: PointInTime): (RawPartition | PartitionRule)[] {
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

export function getAllActivePartitionsForDay(makotoState: MakotoState, exactDay: PreciseDay): (RawPartition | PartitionRule)[] {
    const applicablePartitions: (RawPartition | PartitionRule)[] = [];

    for (let rawPartition of makotoState.data.raw_partitions) {
        if (isRawPartitionActiveOnDay(rawPartition, exactDay)) {
            applicablePartitions.push(rawPartition);
        }
    }

    for (let partitionRule of makotoState.data.partition_rules) {
        if (isPartitionRuleActiveOnDay(partitionRule, exactDay)) {
            applicablePartitions.push(partitionRule);
        }
    }

    return applicablePartitions;
}
