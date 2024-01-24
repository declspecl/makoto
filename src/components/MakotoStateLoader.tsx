import { get_state } from "@/backend/commands";
import { MakotoState } from "@/backend/state";
import { useEffect, useReducer, useState } from "react";
import { MakotoStateContext, makotoStateReducer } from "@/contexts/StateContext";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateLoader({ children }: MakotoStateLoaderProps) {
    const [makotoState, dispatch] = useReducer(makotoStateReducer, undefined!);

    useEffect(() => {
        async function initializeMakotoState() {
            const state = await get_state();

            dispatch({ type: "overrideData", data: state.data });
        }

        initializeMakotoState();
    }, []);

    return (
        <>
            {makotoState === undefined ? (
                <p>loading state...</p>
            ) : (
                <MakotoStateContext.Provider value={[makotoState, dispatch]}>
                    {children}
                </MakotoStateContext.Provider>
            )}
        </>
    )
}