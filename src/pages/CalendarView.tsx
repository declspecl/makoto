import { getRange } from "@/lib/utils";
import { useMemo, useState } from "react";
import { CalendarDay } from "@/components/CalendarDay";
import { CalendarInfo, CalendarViewMode } from "@/lib/calendarInfo";
import { getLeadingDaysForMonth, getNumberOfDaysInMonth, getPreviousMonthIndexAndYear } from "@/lib/helpers/timing";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { CalendarViewControls } from "@/components/CalendarViewControls";

export function CalendarView() {
    const today = new Date();

    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
        targetYear: today.getFullYear(),
        targetMonthIndex: today.getMonth(),
        viewMode: CalendarViewMode.Monthly,
    });

    const daysOfMonth: number[] = useMemo(() => {
        let leadingDays = getLeadingDaysForMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex);

        return leadingDays.concat(...getRange(1, getNumberOfDaysInMonth(calendarInfo.targetYear, calendarInfo.targetMonthIndex)));
    }, [calendarInfo]);

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full gap-2">
                <ResizablePanel minSize={15} defaultSize={25} className="h-full">
                    {/* <Sidebar /> */}
                </ResizablePanel>

                <ResizableHandle className="bg-primary hover:bg-primary-200 hover:w-0.5" />

                <ResizablePanel minSize={50} defaultSize={75} className="h-full">
                    <div className="w-auto h-full flex flex-col gap-1">
                        <CalendarViewControls
                            calendarInfo={calendarInfo}
                            setCalendarInfo={setCalendarInfo}
                        />

                        <div className="grow grid grid-cols-7 grid-flow-row">
                            {daysOfMonth.map((dayOfMonth, i) => (
                                <CalendarDay
                                    key={`dayOfMonth-${dayOfMonth}@${i}`}
                                    year={calendarInfo.targetYear}
                                    monthIndex={(dayOfMonth > 6 && i < 6) ? getPreviousMonthIndexAndYear(calendarInfo.targetMonthIndex, 0)[0] : calendarInfo.targetMonthIndex}
                                    dayOfMonth={dayOfMonth}
                                    isPreceding={dayOfMonth > 6 && i < 6}
                                />
                            ))}
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
