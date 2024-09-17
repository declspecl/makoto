import { PartitionRule, RawPartition } from "@backend/model/partition";

interface PartitionPreview extends React.HTMLAttributes<HTMLDivElement> {
    partition: RawPartition | PartitionRule
}

export function PartitionPreview({ partition }: PartitionPreview) {
    return (
        <div className="px-1.5 rounded-md bg-primary-100">
            <p className="font-semibold overflow-ellipsis">{partition.title}</p>
        </div>
    );
}
