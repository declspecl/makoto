import { useEffect, useState } from "react";
import { ErrorLogContext, SetErrorLogContext } from "@context/ErrorLog";

interface ErrorLogProviderProps {
    children?: React.ReactNode
}

export function ErrorLogProvider({ children }: ErrorLogProviderProps) {
    const [errorLog, setErrorLog] = useState<string[]>([]);

    useEffect(() => {
        console.log("errorLog was updated. new value:");
        console.log(errorLog);
    }, [errorLog]);

    return (
        <ErrorLogContext.Provider value={errorLog}>
            <SetErrorLogContext.Provider value={setErrorLog}>
                {children}
            </SetErrorLogContext.Provider>
        </ErrorLogContext.Provider>
    );
}
