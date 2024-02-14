import { useEffect } from "react";
import { useMakotoStateContext } from "./contexts/MakotoStateContext";
import { getApplicablePartitionsForPointInTime } from "./lib/helpers/partition";
import { PointInTime } from "./backend/model/dayTime";
import { Calendar } from "./pages/Calendar";

export default function App() {
    const makotoState = useMakotoStateContext();

    useEffect(() => {
        if (makotoState.state !== null) {
            const testPointInTime: PointInTime = {
                year: 2024,
                month: "February",
                day_of_month: 12,
                time: { hour: 0, minute: 0}
            };

            console.log("applicable partitions:")
            console.log(getApplicablePartitionsForPointInTime(makotoState.state, testPointInTime));
        }
    }, [makotoState]);

    return (
        <div>
            <Calendar />
        </div>
    );
}
