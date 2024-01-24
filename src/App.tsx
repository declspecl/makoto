import { useEffect, useState } from "react";
import { MakotoState } from "./backend/state";
import { StateContext } from "./contexts/StateContext";
import { get_state } from "./backend/commands";

export default function App() {
    const [makotoState, setMakotoState] = useState<MakotoState | null>(null);

    useEffect(() => {
        let isCancelled = false;

        async function initializeMakotoState() {
            const state = await get_state();

            if (!isCancelled) {
                setMakotoState(state);
            }
        }

        initializeMakotoState();

        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <div>
            {makotoState ? (
                <StateContext.Provider value={makotoState}>
                    <div>
                        <p>{JSON.stringify(makotoState, null, 2)}</p>
                    </div>
                </StateContext.Provider>
            ) : (
                <p>loading state</p>
            )}
        </div>
    );
}