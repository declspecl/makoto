import { CalendarInfo } from "@/lib/calendarInfo";
import { getMonthFromMonthIndex } from "@/lib/helpers/conversions";
import { Button } from "./ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CalendarViewControlsProps extends React.HTMLAttributes<HTMLDivElement> {
    calendarInfo: CalendarInfo,
    setCalendarInfo: React.Dispatch<React.SetStateAction<CalendarInfo>>
}

export function CalendarViewControls({ calendarInfo, setCalendarInfo }: CalendarViewControlsProps) {
    return (
        <div className="flex flex-row items-center gap-2">
            <Button variant="outline" onClick={() => {
                let newYear = calendarInfo.targetYear;
                let newMonthIndex = calendarInfo.targetMonthIndex -= 1;

                if (newMonthIndex < 0) {
                    newMonthIndex = 11;
                    newYear -= 1;
                }

                setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthIndex: newMonthIndex })
            }}>
                <ChevronLeftIcon />
            </Button>

            <h1>{`${getMonthFromMonthIndex(calendarInfo.targetMonthIndex)} ${calendarInfo.targetYear}`}</h1>

            <Button variant="outline" onClick={() => {
                let newYear = calendarInfo.targetYear;
                let newMonthIndex = calendarInfo.targetMonthIndex += 1;

                if (newMonthIndex > 11) {
                    newMonthIndex = 0;
                    newYear += 1;
                }

                setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthIndex: newMonthIndex })
            }}>
                <ChevronRightIcon />
            </Button>
        </div>
    );
}
