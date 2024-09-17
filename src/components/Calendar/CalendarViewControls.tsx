import { Button } from "@components/ui/Button";
import { CalendarInfo } from "@/model/calendarInfo";
import { convertMonthNumberToMonth } from "@/lib/conversions";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getNextMonthNumberAndYear, getPreviousMonthNumberAndYear } from "@/lib/helpers/timing";

interface CalendarViewControlsProps extends React.HTMLAttributes<HTMLDivElement> {
    calendarInfo: CalendarInfo,
    setCalendarInfo: React.Dispatch<React.SetStateAction<CalendarInfo>>
}

export function CalendarViewControls({ calendarInfo, setCalendarInfo }: CalendarViewControlsProps) {
    return (
        <div className="flex flex-row items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                onClick={() => {
                    const [newMonthNumber, newYear] = getPreviousMonthNumberAndYear(calendarInfo.targetMonthNumber, calendarInfo.targetYear);

                    setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthNumber: newMonthNumber })
                }}
            >
                <ChevronLeftIcon />
            </Button>

            <h2>{`${convertMonthNumberToMonth(calendarInfo.targetMonthNumber)} ${calendarInfo.targetYear}`}</h2>

            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                onClick={() => {
                    const [newMonthNumber, newYear] = getNextMonthNumberAndYear(calendarInfo.targetMonthNumber, calendarInfo.targetYear);

                    setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthNumber: newMonthNumber })
                }}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
}
