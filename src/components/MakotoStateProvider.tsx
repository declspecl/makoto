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

        // when the user tries to close the window
        appWindow.onCloseRequested((e) => {
            // try to serialize the current state to disk
            try_serialize_state_to_disk(makotoState)
                .catch((err) => {
                    // if an error prevents serializing to disk, log it and prevent window from closing
                    console.error(err);

                    e.preventDefault();
                });
        }).then((newUnlistener) => {
            // remove the old listener if it exists
            if (serializationUnlistener.current)
                serializationUnlistener.current();

            // after adding the listener, update the listener value
            serializationUnlistener.current = newUnlistener;
        }).catch((err) => {
            // if an error prevents adding the listener, log it
            console.error(err);
        })
        
        return () => {
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
