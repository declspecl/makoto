import React, { createContext, useContext } from "react";

export type SetErrorLogType = React.Dispatch<React.SetStateAction<string[]>>;

export const ErrorLogContext = createContext<string[] | null>(null);
export const SetErrorLogContext = createContext<SetErrorLogType | null>(null);

export function useErrorLogContext(): string[] {
    const errorLog = useContext(ErrorLogContext);

    if (errorLog === null) {
        throw new Error("useErrorLogContext must be used within an ErrorLogProvider");
    }

    return errorLog;
}

export function useSetErrorLogContext(): SetErrorLogType {
    const setErrorLog = useContext(SetErrorLogContext);

    if (setErrorLog === null) {
        throw new Error("useSetErrorLogContext must be used within an SetErrorLogProvider");
    }

    return setErrorLog;
}
