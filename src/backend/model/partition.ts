import { PeriodOfTime } from "./dayTime";
import { ActivationModifier, ActivationQuery } from "./activation";

export interface RawPartition {
    title: string,
    description: string,
    period_of_time: PeriodOfTime,
    tag_indices: number[]
}

export interface PartitionRule {
    title: string,
    description: string,
    query: ActivationQuery,
    query_modifiers: ActivationModifier[],
    tag_indices: number[]
}
