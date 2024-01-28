import { PeriodOfTime } from "./dayTime";
import { ActivationModifier, ActivationQuery } from "./activation";
import { Tag } from "../tag";

export interface RawPartition {
    title: string,
    description: string,
    period_of_time: PeriodOfTime,
    tag_names: string[]
}

export interface PartitionRule {
    title: string,
    description: string,
    query: ActivationQuery,
    query_modifiers: ActivationModifier[],
    tag_names: string[]
}