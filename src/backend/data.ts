import { Tag } from "./tag";
import { PartitionRule, RawPartition } from "./model/partition";

export interface MakotoData {
    raw_partitions: RawPartition[],
    partition_rules: PartitionRule[],
    tags: Map<string, Tag>
}