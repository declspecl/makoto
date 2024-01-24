import { get_state } from "@/backend/commands";
import { MakotoState } from "@/backend/state";
import { StateContext } from "@/contexts/StateContext";
import { useEffect, useState } from "react";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateLoader({ children }: MakotoStateLoaderProps) {
    const [makotoState, setMakotoState] = useState<MakotoState | undefined>(undefined);

    useEffect(() => {
        let isCancelled = false;

        async function getMakotoStateFromBackend() {
            const state = await get_state();

            if (!isCancelled) {
                setMakotoState(state);
            }
        }

        getMakotoStateFromBackend();

        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <>
            {makotoState === undefined ? (
                <p>loading makoto state...</p>
            ) : (
                <StateContext.Provider value={makotoState}>
                    {children}
                </StateContext.Provider>
            )}
        </>
    )
}