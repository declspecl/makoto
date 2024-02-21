import { useState } from "react";
import { ErrorLogContext, SetErrorLogContext } from "@/contexts/ErrorLog";

interface ErrorLogProviderProps {
    children?: React.ReactNode
}

export function ErrorLogProvider({ children }: ErrorLogProviderProps) {
    const [errorLog, setErrorLog] = useState<string[]>([]);

    return (
        <ErrorLogContext.Provider value={errorLog}>
            <SetErrorLogContext.Provider value={setErrorLog}>
                {children}
            </SetErrorLogContext.Provider>
        </ErrorLogContext.Provider>
    );
}
