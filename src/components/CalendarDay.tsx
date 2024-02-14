import { cn } from "@/lib/utils";
import React from "react";

interface CalendarDayProps extends React.HTMLAttributes<HTMLDivElement> {
    dayNumber: number,
    className?: string
}

export function CalendarDay({ dayNumber, className }: CalendarDayProps) {
    return (
        <div
            className={cn(
                "bg-background-muted",
                className
            )}
        >
            {dayNumber}
        </div>
    );
}
