import { CalendarInfo } from "@/backend/calendarInfo";
import { createContext, useContext } from "react";

export const CalendarInfoContext = createContext<CalendarInfo>(null!);

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
