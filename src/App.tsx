import { useEffect } from "react";
import { Calendar } from "./pages/Calendar";
import { PointInTime } from "./backend/model/dayTime";
import { useMakotoStateContext } from "./contexts/MakotoStateContext";
import { getApplicablePartitionsForPointInTime } from "./lib/helpers/partition";

export default function App() {
    const { state: makotoState, error } = useMakotoStateContext();

    useEffect(() => {
        if (makotoState) {
            const testPointInTime: PointInTime = {
                year: 2024,
                month: "February",
                day_of_month: 12,
                time: { hour: 0, minute: 0}
            };

            console.log("applicable partitions:")
            console.log(getApplicablePartitionsForPointInTime(makotoState, testPointInTime));

            console.log("all raw partitions:")
            console.log(makotoState.data.raw_partitions);

            console.log("all partition rules:")
            console.log(makotoState.data.partition_rules);
        }
    }, [makotoState]);

    return (
        <div className="w-full h-full">
            <Calendar />
        </div>
    );
}
