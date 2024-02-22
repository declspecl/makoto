import { useEffect, useReducer, useState } from "react";
import { MakotoError } from "@/backend/error";
import { try_deserialize_state_from_disk } from "@/backend/commands";
import { MakotoStateContext, MakotoStateDispatchContext, makotoStateReducer } from "@/contexts/MakotoStateContext";
import { Button } from "./ui/Button";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateProvider({ children }: MakotoStateLoaderProps) {
    const [makotoState, dispatch] = useReducer(makotoStateReducer, null!);
    const [startupError, setStartupError] = useState<MakotoError | null>(null);

    useEffect(() => {
        let isCancelled = false;

        try_deserialize_state_from_disk()
            .then((state) => {
                if (!isCancelled)
                    dispatch({ type: "override", state });
            })
            .catch((err) => setStartupError(err as MakotoError));

        return () => {
            isCancelled = true;
        }
    }, []);

    return (
        <>
            {makotoState ? (
                <MakotoStateContext.Provider value={makotoState}>
                    <MakotoStateDispatchContext.Provider value={dispatch}>
                        {children}
                    </MakotoStateDispatchContext.Provider>
                </MakotoStateContext.Provider>
            ) : (
                <>
                    {startupError ? (
                        <div className="w-full h-full flex flex-column justify-center items-center">
                            <p>{`${startupError.tag} : ${startupError.message}`}</p>

                            <Button onClick={() => console.log("TODO")}>
                                Set to default
                            </Button>
                        </div>
                    ) : (
                        <p>loading...</p>
                    )}
                </>
            )}
        </>
    );
}
