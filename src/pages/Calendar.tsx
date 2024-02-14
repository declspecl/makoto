import { useEffect, useMemo, useState } from "react";
import { CalendarInfo, CalendarViewMode } from "@/backend/calendarInfo";
import { getLeadingDaysFromPrecedingMonth, getNumberOfDaysInMonth } from "@/lib/helpers/timing";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { getRange } from "@/lib/utils";


export function Calendar() {
    const today = new Date();

    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
        targetYear: today.getFullYear(),
        targetMonth: today.getMonth() + 1,
        viewMode: CalendarViewMode.Monthly,
    });

    const daysOfMonth: number[] = useMemo(() => {
        let daysOfMonth = getLeadingDaysFromPrecedingMonth(calendarInfo.targetYear, calendarInfo.targetMonth);

        daysOfMonth.push(...getRange(1, getNumberOfDaysInMonth(calendarInfo.targetYear, calendarInfo.targetMonth)));

        return daysOfMonth;
    }, [calendarInfo]);

    useEffect(() => {
        // console.log(today.getDate());

        // console.table(calendarInfo);

        console.log(daysOfMonth);
    }, []);

    return (
        <div className="w-full h-full">
            <ResizablePanelGroup direction="horizontal" className="w-full h-full">
                <ResizablePanel minSize={15} defaultSize={30}>
                    {/* <Sidebar /> */}
                </ResizablePanel>

                <ResizableHandle />

                <ResizablePanel minSize={50} defaultSize={70}>
                    <div className="w-auto grid grid-cols-7 grid-flow-row">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                        <div>8</div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
