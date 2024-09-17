import { Button } from "./ui/Button";
import { MakotoError } from "@/backend/api/error";
import { appWindow } from "@tauri-apps/api/window";
import { UnlistenFn } from "@tauri-apps/api/event";
import { useEffect, useReducer, useRef, useState } from "react";
import { try_deserialize_state_from_disk, try_serialize_state_to_disk } from "@backend/api/commands";
import { MakotoStateContext, MakotoStateDispatchContext, makotoStateReducer } from "@context/MakotoStateContext";

interface MakotoStateLoaderProps {
    children: React.ReactNode
}

export function MakotoStateProvider({ children }: MakotoStateLoaderProps) {
    const [makotoState, dispatch] = useReducer(makotoStateReducer, null!);
    const [startupError, setStartupError] = useState<MakotoError | null>(null);
    const serializationUnlistener = useRef<UnlistenFn | null>(null);

    useEffect(() => {
        let isCancelled = false;

        try_deserialize_state_from_disk(true)
            .then((state) => {
                console.log(state);

                if (!isCancelled)
                    dispatch({ type: "override", state });
            })
            .catch((err) => {
                console.error(err);
                setStartupError(err as MakotoError);
            });

        return () => {
            isCancelled = true;
        }
    }, []);

    useEffect(() => {
        if (!makotoState) return;

        let isCancelled = false;

        appWindow.onCloseRequested((e) => {
            if (isCancelled) return;

            try_serialize_state_to_disk(makotoState)
                .catch((err) => {
                    console.error(err);

                    e.preventDefault();

                    // TODO: implement a confirm dialog if it fails
                })
        })
        .then((unlisten) => {
            if (serializationUnlistener.current)
                serializationUnlistener.current();

            serializationUnlistener.current = unlisten;
        });
        
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
                            <p>{`${startupError.type} : ${startupError.message}`}</p>

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
