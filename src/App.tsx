import { useEffect } from "react";
import { useMakotoStateContext } from "./contexts/MakotoStateContext";
import { getApplicablePartitionsForPointInTime } from "./backend/utils";
import { PointInTime } from "./backend/model/dayTime";
import { useCalendarInfoContext } from "./contexts/CalendarInfoContext";

export default function App() {
    const makotoState = useMakotoStateContext();

    const calendarInfo = useCalendarInfoContext();

    useEffect(() => {
        if (calendarInfo) {
            console.log(calendarInfo);
        }
    }, [calendarInfo]);

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
