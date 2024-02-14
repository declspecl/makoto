import { MakotoState } from "@/backend/model/state";
import { PointInTime } from "@/backend/model/dayTime";
import { getDayOfWeekFromDayNumber } from "./conversions";
import { PartitionRule, RawPartition } from "@/backend/model/partition";
import { getDateObjectFromPointInTime, isPointInTimeInPeriodOfTime } from "./timing";

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

