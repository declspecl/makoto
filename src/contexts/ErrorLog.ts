import { createContext, useContext } from "react";

export const ErrorLogContext = createContext<string[] | null>(null);

export function useErrorLogContext() {
    const errorLog = useContext(ErrorLogContext);

    if (errorLog === null) {
        throw new Error("ErrorLogContext is null");
    }

    return errorLog;
}