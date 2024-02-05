import { cn } from "@/lib/utils";
import React from "react";

interface CalendarCellProps extends React.HTMLAttributes<HTMLDivElement> {
    dayNumber: number,
}

export function CalendarCell({ dayNumber, className }: CalendarCellProps) {
    return (
        <div className={cn(className)}>
            <h3>{dayNumber}</h3>

            <div className="flex flex-col">
            {/* TODO: this is where most of the partition logic will go. will need to iterate through raw partitions and partition rules to see if the partition should be displayed here */}
            </div>
        </div>
    );
}
