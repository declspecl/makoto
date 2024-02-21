import React, { createContext, useContext } from "react";

export const ErrorLogContext = createContext<string[]>([]);
export const SetErrorLogContext = createContext<React.Dispatch<React.SetStateAction<string[]>>>(null!);

export function useErrorLogContext(): string[] {
    const errorLog = useContext(ErrorLogContext);

    if (errorLog === null) {
        throw new Error("useErrorLogContext must be used within an ErrorLogProvider");
    }

    return errorLog;
}

export function useSetErrorLogContext(): React.Dispatch<React.SetStateAction<string[]>> {
    const setErrorLog = useContext(SetErrorLogContext);

    if (setErrorLog === null) {
        throw new Error("useSetErrorLogContext must be used within an SetErrorLogProvider");
    }

    return setErrorLog;
}
