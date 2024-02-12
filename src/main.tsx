import "./styles.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorLogContext } from "./contexts/ErrorLog";
import { MakotoStateProvider } from "./components/MakotoStateProvider";
import { CalendarInfoContext } from "./contexts/CalendarInfoContext";
import { CalendarViewMode } from "./backend/calendarInfo";
import { getMonthFromMonthNumber } from "./backend/utils";

const today = new Date();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorLogContext.Provider value={[]}>
            <MakotoStateProvider>
                <CalendarInfoContext.Provider value={{
                    year: today.getFullYear(),
                    month: getMonthFromMonthNumber(today.getMonth() + 1),
                    dayOfMonth: today.getDay(),
                    viewMode: CalendarViewMode.Monthly
                }}>
                    <App />
                </CalendarInfoContext.Provider>
            </MakotoStateProvider>
        </ErrorLogContext.Provider>
    </React.StrictMode>
);
