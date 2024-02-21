import { useEffect, useReducer } from "react";
import { useSetErrorLogContext } from "@/contexts/ErrorLog";
import { try_deserialize_state_from_disk } from "@/backend/commands";
import { MakotoStateContext, MakotoStateDispatchContext, makotoStateReducer } from "@/contexts/MakotoStateContext";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateProvider({ children }: MakotoStateLoaderProps) {
    const setErrorLog = useSetErrorLogContext();
    const [errorfulMakotoState, dispatch] = useReducer(makotoStateReducer, null!);

    useEffect(() => {
        let isCancelled = false;

        try_deserialize_state_from_disk()
            .then((state) => {
                if (!isCancelled)
                    dispatch({ type: "override", state });
            })
            .catch((err) => setErrorLog(err));

        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <>
            {errorfulMakotoState ? (
                <MakotoStateContext.Provider value={errorfulMakotoState}>
                    <MakotoStateDispatchContext.Provider value={dispatch}>
                        {children}
                    </MakotoStateDispatchContext.Provider>
                </MakotoStateContext.Provider>
            ) : (
                <p>loading...</p>
            )}
        </>
    );
}
