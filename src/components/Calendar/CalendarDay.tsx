import React from "react";
import { cn } from "@lib/utils";
import { useMakotoStateContext } from "@context/MakotoStateContext";
import { getAllActivePartitionsForDay } from "@lib/helpers/partition";
import { PartitionPreview } from "./PartitionPreview";

interface CalendarDayProps extends React.HTMLAttributes<HTMLDivElement> {
    year: number,
    monthIndex: number,
    dayOfMonth: number,
    today: Date,
    isPreceding: boolean,
    className?: string
}

export function CalendarDay({ year, monthIndex, dayOfMonth, isPreceding, today, className }: CalendarDayProps) {
    const state = useMakotoStateContext();

    const applicablePartitions = getAllActivePartitionsForDay(state, {
        year, monthIndex, dayOfMonth
    });

    return (
        <div
            className={cn(
                "p-1.5 flex flex-col justify-between bg-transparent transition-colors border border-muted",
                "hover:bg-muted/85",
                { "bg-secondary-50 hover:bg-secondary-100" : today.getDate() === dayOfMonth && today.getMonth() === monthIndex && today.getFullYear() === year },
                className
            )}
            onClick={() => {
                console.log(`partitions for ${monthIndex + 1}/${dayOfMonth}/${year}:`)
                console.log(applicablePartitions);
            }
        }>
            <h5 className={cn("leading-none font-medium", {  "text-background-foreground/35" : isPreceding })}>{dayOfMonth}</h5>

            {applicablePartitions.length > 0 && (
                <PartitionPreview partition={applicablePartitions[0]} />
            )}
        </div>
    );
}
