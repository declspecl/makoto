import { useEffect } from "react";
import { Tag } from "./backend/tag";
import { Button } from "./components/ui/Button";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";
import { Calendar } from "./pages/Calendar";
import { PartitionRule, RawPartition } from "./backend/model/partition";
import { isPartitionRuleActiveAtPointInTime } from "./backend/utils";
import { PointInTime } from "./backend/model/dayTime";

export default function App() {
    const makotoState = useMakotoStateContext();
    const dispatch = useMakotoStateDispatchContext();

    useEffect(() => {
        console.log(makotoState);

        if (makotoState.state !== null) {
            const rawPartitions: RawPartition[] = makotoState.state.data.raw_partitions;

            for (let rawPartition of rawPartitions) {
                console.log(`${rawPartition.title}, ${rawPartition.description}, ${rawPartition.period_of_time}, ${rawPartition.tag_indices.length}`);
            }

            const partitionRules: PartitionRule[] = makotoState.state.data.partition_rules;

            const todayPointInTime: PointInTime = {
                year: 2024,
                month: "February",
                day_of_month: 12,
                time: { hour: 11, minute: 12 }
            };

            for (let partitionRule of partitionRules) {
                console.table(partitionRule);
                console.log(isPartitionRuleActiveAtPointInTime(partitionRule, todayPointInTime));
            }
        }
    }, [makotoState]);

    return (
        <div>

            {/* <Calendar /> */}
        </div>
    );
}
