import { CalendarInfo } from "@/lib/calendarInfo";
import { getMonthFromMonthIndex } from "@/lib/helpers/conversions";
import { Button } from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { getNextMonthIndexAndYear, getPreviousMonthIndexAndYear } from "@/lib/helpers/timing";

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
                    const [newMonthIndex, newYear] = getPreviousMonthIndexAndYear(calendarInfo.targetMonthIndex, calendarInfo.targetYear);

                    setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthIndex: newMonthIndex })
                }}
            >
                <ChevronLeftIcon />
            </Button>

            <h2>{`${getMonthFromMonthIndex(calendarInfo.targetMonthIndex)} ${calendarInfo.targetYear}`}</h2>

            <Button
                variant="outline"
                size="icon"
                className="w-8 h-8"
                onClick={() => {
                    const [newMonthIndex, newYear] = getNextMonthIndexAndYear(calendarInfo.targetMonthIndex, calendarInfo.targetYear);

                    setCalendarInfo({ ...calendarInfo, targetYear: newYear, targetMonthIndex: newMonthIndex })
                }}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
}
