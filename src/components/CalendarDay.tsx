import React from "react";
import { cn } from "@/lib/utils";
import { useMakotoStateContext } from "@/contexts/MakotoStateContext";
import { getAllActivePartitionsForDay } from "@/lib/helpers/partition";

interface CalendarDayProps extends React.HTMLAttributes<HTMLDivElement> {
    year: number,
    monthIndex: number,
    dayOfMonth: number,
    isPreceding: boolean,
    className?: string
}

export function CalendarDay({ year, monthIndex, dayOfMonth, isPreceding, className }: CalendarDayProps) {
    const { state: makotoState, error } = useMakotoStateContext();

    if (error) {
        return <p>{JSON.stringify(error)}</p>;
    }
    if (!makotoState) {
        return <p>loading...</p>;
    }

    const applicablePartitions = getAllActivePartitionsForDay(makotoState, {
        year, monthIndex, dayOfMonth
    });

    return (
        <button
            className={cn(
                "bg-background-muted text-center transition-colors",
                "hover:bg-background-muted/85",
                className
            )}
            onClick={() => {
                console.log(`partitions for ${monthIndex + 1}/${dayOfMonth}/${year}:`)
                console.log(applicablePartitions);
            }
        }>
            <h5 className={cn({ "text-background-foreground/35" : isPreceding })}>{dayOfMonth}</h5>
            <p>{applicablePartitions.length}</p>
        </button>
    );
}
