import { useEffect, useMemo, useState } from "react";
import { CalendarInfo, CalendarViewMode } from "@/lib/calendarInfo";
import { getLeadingDaysFromPrecedingMonth, getNumberOfDaysInMonth } from "@/lib/helpers/timing";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { cn, getRange } from "@/lib/utils";
import { CalendarDay } from "@/components/CalendarDay";


export function Calendar() {
    const today = new Date(2024, 5);
    // const today = new Date();

    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
        targetYear: today.getFullYear(),
        targetMonthIndex: today.getMonth(),
        viewMode: CalendarViewMode.Monthly,
    });

    useEffect(() => {
        console.table(calendarInfo);
    }, []);

    const daysOfMonth: number[] = useMemo(() => {
        let dom = getLeadingDaysFromPrecedingMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex);

        dom.push(...getRange(1, getNumberOfDaysInMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex)));

        return dom;
    }, [calendarInfo]);

    useEffect(() => {
        console.log(daysOfMonth);
    }, [daysOfMonth]);

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                <ResizablePanel minSize={15} defaultSize={15} className="h-full">
                    {/* <Sidebar /> */}
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel minSize={50} defaultSize={85} className="h-full">
                    <div className="w-auto h-full grid grid-cols-7 grid-flow-row">
                        {daysOfMonth.map((day, i) => (
                            <CalendarDay
                                key={`day-${day}@${i}`}
                                dayNumber={day}
                                className={cn(
                                    "flex justify-center items-center",
                                    { "text-background-foreground/35" : (day > 6 && i < 6) }
                                )}
                            />
                        ))}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
