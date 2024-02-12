import { useEffect } from "react";
import { Tag } from "./backend/tag";
import { Button } from "./components/ui/Button";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";
import { Calendar } from "./pages/Calendar";
import { PartitionRule, RawPartition } from "./backend/model/partition";
import { getApplicablePartitionsForPointInTime, isPartitionRuleActiveAtPointInTime } from "./backend/utils";
import { PointInTime } from "./backend/model/dayTime";

export default function App() {
    const makotoState = useMakotoStateContext();
    const dispatch = useMakotoStateDispatchContext();

    useEffect(() => {
        console.log(makotoState);

        if (makotoState.state !== null) {
            const testPointInTime: PointInTime = {
                year: 2024,
                month: "February",
                day_of_month: 12,
                time: { hour: 0, minute: 0}
            };

            console.log(getApplicablePartitionsForPointInTime(makotoState.state, testPointInTime));
        }
    }, [makotoState]);

    return (
        <div>

            {/* <Calendar /> */}
        </div>
    );
}
