import React from "react";
import { cn } from "@/lib/utils";
import { useMakotoStateContext } from "@/contexts/MakotoStateContext";
import { getAllActivePartitionsForDay } from "@/lib/helpers/partition";

interface CalendarDayProps extends React.HTMLAttributes<HTMLDivElement> {
    dayNumber: number,
    monthIndex: number,
    year: number,
    isPreceding: boolean,
    className?: string
}

export function CalendarDay({ dayNumber, monthIndex, year, isPreceding, className }: CalendarDayProps) {
    const { state: makotoState, error } = useMakotoStateContext();

    if (error) {
        return <p>{JSON.stringify(error)}</p>;
    }
    if (!makotoState) {
        return <p>loading...</p>;
    }

    const applicablePartitions = getAllActivePartitionsForDay(makotoState, year, monthIndex, dayNumber);

    return (
        <button
            className={cn(
                "bg-background-muted text-center transition-colors",
                "hover:bg-background-muted/85",
                className
            )}
            onClick={() => {
                console.log(`partitions for ${monthIndex + 1}/${dayNumber}/${year}:`)
                console.log(applicablePartitions);
            }
        }>
            <h5 className={cn({ "text-background-foreground/35" : isPreceding })}>{dayNumber}</h5>
            <p>{applicablePartitions.length}</p>
        </button>
    );
}
