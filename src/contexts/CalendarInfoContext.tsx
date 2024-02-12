import { CalendarInfo, CalendarViewMode } from "@/backend/calendarInfo";
import { getMonthFromMonthNumber } from "@/backend/utils";
import { createContext, useContext } from "react";

const today = new Date();

export const CalendarInfoContext = createContext<CalendarInfo>({
    year: today.getFullYear(),
    month: getMonthFromMonthNumber(today.getMonth() + 1),
    dayOfMonth: today.getDay(),
    viewMode: CalendarViewMode.Monthly
});

export const CalendarInfoDispatchContext = createContext<React.Dispatch<CalendarInfo>>(undefined!);

export function useCalendarInfoContext() {
    const makotoState = useContext(CalendarInfoContext);

    if (makotoState === null) {
        throw new Error("useCalendarInfoContext must be used within a CalendarInfoContextProvider");
    }

    return makotoState;
}

export function useCalendarInfoDispatchContext() {
    const makotoDispatchState = useContext(CalendarInfoDispatchContext);

    if (makotoDispatchState === null) {
        throw new Error("useCalendarInfoDispatchContext must be used within a CalendarInfoDispatchContextProvider");
    }

    return makotoDispatchState;
}
