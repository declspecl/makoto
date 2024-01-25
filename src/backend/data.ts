import { Tag } from "./tag";
import { PartitionRule, RawPartition } from "./model/partition";

interface TagMap {
    [tag_name: string]: Tag
}

export interface MakotoData {
    raw_partitions: RawPartition[],
    partition_rules: PartitionRule[],
    tags: TagMap
}