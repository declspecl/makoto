import { getRange } from "@/lib/utils";
import { useMemo, useState } from "react";
import { CalendarDay } from "@/components/CalendarDay";
import { CalendarInfo, CalendarViewMode } from "@/lib/calendarInfo";
import { getLeadingDaysForMonth, getNumberOfDaysInMonth } from "@/lib/helpers/timing";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";

export function Calendar() {
    const today = new Date();

    const [calendarInfo, _setCalendarInfo] = useState<CalendarInfo>({
        targetYear: today.getFullYear(),
        targetMonthIndex: today.getMonth(),
        viewMode: CalendarViewMode.Monthly,
    });

    const daysOfMonth: number[] = useMemo(() => {
        let dom = getLeadingDaysForMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex);

        dom.push(...getRange(1, getNumberOfDaysInMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex)));

        return dom;
    }, [calendarInfo]);

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                <ResizablePanel minSize={15} defaultSize={15} className="h-full">
                    {/* <Sidebar /> */}
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel minSize={50} defaultSize={85} className="h-full">
                    <div className="w-auto h-full grid grid-cols-7 grid-flow-row">
                        {daysOfMonth.map((dayOfMonth, i) => (
                            <CalendarDay
                                key={`dayOfMonth-${dayOfMonth}@${i}`}
                                year={calendarInfo.targetYear}
                                monthIndex={(dayOfMonth > 6 && i < 6) ? calendarInfo.targetMonthIndex - 1 : calendarInfo.targetMonthIndex}
                                dayOfMonth={dayOfMonth}
                                isPreceding={dayOfMonth > 6 && i < 6}
                            />
                        ))}
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
