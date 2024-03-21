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

/**
 * Checks if a given `RawPartition` object is active at ***ANY*** point during the given `PreciseDay` object
 * @param {RawPartition} partition The `RawPartition` object that will be checked if it is active during the given day
 * @param {PreciseDay} exactDay The `PreciseDay` object that will be checked in
 * @returns {boolean} A boolean value representing whether the `RawPartition` is active in the `PreciseDay` or not
 */
export function isRawPartitionActiveOnDay(partition: RawPartition, exactDay: PreciseDay): boolean {
    // TODO: this may be problematic. see timing.ts:14 and the trello ticket for more info
    // this also might not be implemented correctly 💀

    if (exactDay.year < partition.period_of_time.start.year || exactDay.year > partition.period_of_time.end.year) return false;
    if (exactDay.monthIndex < getMonthIndexFromMonth(partition.period_of_time.start.month) ||
        exactDay.monthIndex > getMonthIndexFromMonth(partition.period_of_time.end.month)) return false;
    if (exactDay.dayOfMonth < partition.period_of_time.start.day_of_month || exactDay.dayOfMonth > partition.period_of_time.end.day_of_month) return false;

    return true;
}

/**
 * Checks if a given `PartitionRule` object is active at some point during the given `PointInTime` object
 * @param {PartitionRule} partition The `PartitionRule` object that will be checked if it is active during the given point in time
 * @param {PointInTime} pointInTime The `PointInTime` object that will be checked in
 * @returns {boolean} A boolean value representing whether the `PartitionRule` is active in the `PointInTime` or not
 */
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

/**
 * Checks if a given `PartitionRule` object is active at ***ANY*** point during the `PreciseDay` object
 * @param {PartitionRule} partition The `PartitionRule` object that will be checked if it is active during the given day
 * @param {PreciseDay} exactDay The `PreciseDay` object that will be checked in
 * @returns {boolean} A boolean value representing whether the `PartitionRule` is active at any point during the `PreciseDay` object or not
 */
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

/**
 * Receieves all of the `RawPartition` and `PartitionRule` objects that are active on a given `PointInTime` object
 * @param {MakotoState} makotoState The `MakotoState` object that contains the partitions
 * @param {PointInTime} pointInTime The `PointInTime` object that will be checked in
 * @returns {(RawPartition | PartitionRule)[]} A list of `RawPartition` and `PartitionRule` objects that are active during the given `PointInTime` object
 */
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

/**
 * Receieves all of the `RawPartition` and `PartitionRule` objects that are active on a given `PreciseDay` object
 * @param {MakotoState} makotoState The `MakotoState` object that contains the partitions
 * @param {PreciseDay} exactDay The `PreciseDay` object that will be checked in
 * @returns {(RawPartition | PartitionRule)[]} A list of `RawPartition` and `PartitionRule` objects that are active during the given `PreciseDay` object
 */
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
