import { Tag } from "./tag";
import { PartitionRule, RawPartition } from "./partition";

export interface MakotoData {
    raw_partitions: RawPartition[],
    partition_rules: PartitionRule[],
    tag_pool: Tag[]
}
