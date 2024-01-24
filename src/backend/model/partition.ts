import { PeriodOfTime } from "./dayTime";
import { ActivationModifier, ActivationQuery } from "./activation";

export interface RawPartition {
    title: string,
    description: string,
    period_of_time: PeriodOfTime
}

export interface PartitionRule {
    title: string,
    description: string,
    query: ActivationQuery,
    query_modifiers: ActivationModifier[]
}