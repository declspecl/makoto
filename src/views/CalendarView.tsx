import { generateRange } from "@lib/utils";
import { useMemo, useState } from "react";
import { Sidebar } from "@components/Sidebar";
import { CalendarDay } from "@components/Calendar/CalendarDay";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@components/ui/Resizable";
import { CalendarViewControls } from "@components/Calendar/CalendarViewControls";
import { CalendarInfo, CalendarViewMode } from "@/model/calendarInfo";
import { getNumberOfDaysInMonth, getPreviousMonthDayNumbersInWeekOfNewMonthStart, getPreviousMonthNumberAndYear } from "@/lib/helpers/timing";

export function CalendarView() {
    const today = new Date();

    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
        targetYear: today.getFullYear(),
        targetMonthNumber: today.getMonth() + 1,
        viewMode: CalendarViewMode.Monthly,
    });

    const daysOfMonth: number[] = useMemo(() => {
        let leadingDays = getPreviousMonthDayNumbersInWeekOfNewMonthStart(calendarInfo.targetYear, calendarInfo.targetMonthNumber);

        return leadingDays.concat(...generateRange(1, getNumberOfDaysInMonth(calendarInfo.targetYear, calendarInfo.targetMonthNumber)));
    }, [calendarInfo]);

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full gap-2">
                <ResizablePanel minSize={15} defaultSize={25} className="h-full">
                    <Sidebar />
                </ResizablePanel>

                <ResizableHandle className="bg-primary" />

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
                                    monthNumber={(dayOfMonth > 7 && i < 7) ? getPreviousMonthNumberAndYear(calendarInfo.targetMonthNumber, 0)[0] : calendarInfo.targetMonthNumber}
                                    dayOfMonth={dayOfMonth}
                                    today={today}
                                    isPreceding={dayOfMonth > 7 && i < 7}
                                />
                            ))}
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
