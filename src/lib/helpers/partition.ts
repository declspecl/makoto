import { PreciseDay } from "@/model/dayTime";
import { MakotoState } from "@/backend/model/state";
import { PointInTime } from "@/backend/model/dayTime";
import { isPointInTimeInPeriodOfTime } from "./timing";
import { PartitionRule, RawPartition } from "@/backend/model/partition";
import { convertDayNumberToDayOfWeek, convertPointInTimeToDate, convertPreciseDayToDate } from "../conversions";

export function isRawPartitionEverActiveOnDay(partition: RawPartition, preciseDay: PreciseDay): boolean {
    const preciseDayDate = convertPreciseDayToDate(preciseDay);

    // set partition start and end times to the beginning and end of the day
    // to ensure that days that are partially covered by the partition are included
    const rawPartitionStartDate = convertPointInTimeToDate(partition.period_of_time.start);
    rawPartitionStartDate.setHours(0, 0, 0, 0);

    const rawPartitionEndDate = convertPointInTimeToDate(partition.period_of_time.end);
    rawPartitionEndDate.setHours(23, 59, 59, 999);

    return rawPartitionStartDate <= preciseDayDate && preciseDayDate <= rawPartitionEndDate;
}

export function isPartitionRuleActiveAtPointInTime(partition: PartitionRule, pointInTime: PointInTime): boolean {
    switch (partition.query.type) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(pointInTime.day_of_month);

        case "OnDaysOfWeek":
            const pointInTimeDate = convertPointInTimeToDate(pointInTime);
            const pointInTimeDayOfWeek = convertDayNumberToDayOfWeek(pointInTimeDate.getDay() + 1);

            return partition.query.days.includes(pointInTimeDayOfWeek);
    }
}

export function isPartitionRuleActiveOnDay(partition: PartitionRule, preciseDay: PreciseDay): boolean {
    switch (partition.query.type) {
        case "OnDaysOfMonth":
            return partition.query.days.includes(preciseDay.dayOfMonth);

        case "OnDaysOfWeek":
            const preciseDayDate = convertPreciseDayToDate(preciseDay);
            const pointInTimeDayOfWeek = convertDayNumberToDayOfWeek(preciseDayDate.getDay() + 1);

            return partition.query.days.includes(pointInTimeDayOfWeek);
    }
}

export function getAllActivePartitionsAtPointInTime(makotoState: MakotoState, pointInTime: PointInTime): (RawPartition | PartitionRule)[] {
    const applicableRawPartitions = makotoState.data.raw_partitions.filter(
        rawPartition => isPointInTimeInPeriodOfTime(pointInTime, rawPartition.period_of_time)
    );

    const applicablePartitionRules = makotoState.data.partition_rules.filter(
        partitionRule => isPartitionRuleActiveAtPointInTime(partitionRule, pointInTime)
    );

    return [...applicableRawPartitions, ...applicablePartitionRules];
}

export function getAllActivePartitionsForDay(makotoState: MakotoState, preciseDay: PreciseDay): (RawPartition | PartitionRule)[] {
    const applicableRawPartitions = makotoState.data.raw_partitions.filter(
        rawPartition => isRawPartitionEverActiveOnDay(rawPartition, preciseDay)
    );

    const applicablePartitionRules = makotoState.data.partition_rules.filter(
        partitionRule => isPartitionRuleActiveOnDay(partitionRule, preciseDay)
    );

    return [...applicableRawPartitions, ...applicablePartitionRules];
}
