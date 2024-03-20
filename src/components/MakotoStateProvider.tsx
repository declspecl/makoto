import { Button } from "./ui/Button";
import { MakotoError } from "@/backend/error";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useReducer, useRef, useState } from "react";
import { try_deserialize_state_from_disk, try_serialize_state_to_disk } from "@/backend/commands";
import { MakotoStateContext, MakotoStateDispatchContext, makotoStateReducer } from "@/contexts/MakotoStateContext";
import { UnlistenFn } from "@tauri-apps/api/event";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateProvider({ children }: MakotoStateLoaderProps) {
    const [makotoState, dispatch] = useReducer(makotoStateReducer, null!);
    const [startupError, setStartupError] = useState<MakotoError | null>(null);
    const serializationUnlistener = useRef<UnlistenFn | null>(null);

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

    useEffect(() => {
        if (!makotoState) return;

        let isCancelled = false;

        async function setupListener() {
            try {
                const unlisten = await appWindow.onCloseRequested((e) => {
                    if (isCancelled) return;

                    // try to serialize the current state to disk
                    try_serialize_state_to_disk(makotoState)
                        .then(() => {
                            alert("serialized without error!")

                            e.preventDefault();
                        })
                        .catch((err) => {
                            // if an error prevents serializing to disk, log it and prevent window from closing
                            console.error(err);

                            e.preventDefault();
                        });
                });

                console.log("added listener");

                if (serializationUnlistener.current) {
                    serializationUnlistener.current();
                    console.log("removed old listener")
                }

                serializationUnlistener.current = unlisten;
            }
            catch (e) {
                console.error(e);
            }
        }

        setupListener();
        
        return () => {
            isCancelled = true;

            // on unmount, remove the listener
            if (serializationUnlistener.current)
                serializationUnlistener.current();
        }
    }, [makotoState]);
    
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
