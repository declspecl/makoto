import { useEffect, useReducer } from "react";
import { get_state } from "@/backend/commands";
import { MakotoStateContext, MakotoStateDispatchContext, makotoStateReducer } from "@/contexts/MakotoStateContext";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateProvider({ children }: MakotoStateLoaderProps) {
    const [errorfulMakotoState, dispatch] = useReducer(makotoStateReducer, { state: null, error: null });

    useEffect(() => {
        let isCancelled = false;

        async function initializeMakotoState() {
            const state = await get_state();

            if (!isCancelled)
                dispatch({ type: "override", state: state });
        }

        initializeMakotoState();

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