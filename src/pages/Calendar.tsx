import { CalendarInfo, CalendarViewMode } from "@/backend/calendarInfo";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { useEffect, useState } from "react";
import { getNumberOfDaysInMonth } from "@/lib/helpers/timing";

const today = new Date();

export function Calendar() {
    const [calendarInfo, setCalendarInfo] = useState<CalendarInfo>({
        today: today,
        viewMode: CalendarViewMode.Monthly,
    });

    useEffect(() => {
        console.log(today.getDate());

        console.table(calendarInfo);

        console.log(getNumberOfDaysInMonth(calendarInfo.today.getFullYear(), calendarInfo.today.getMonth()));
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
