import { Button } from "../components/ui/Button";
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

    const shutdownListener = useRef<UnlistenFn>(() => {});

    useEffect(() => {
        let isCancelled = false;

        (async () => {
            try {
                const state = await try_deserialize_state_from_disk(true);

                if (!isCancelled) {
                    dispatch({ type: "override", state });
                }
            }
            catch (err) {
                setStartupError(err as MakotoError);
            }
        })();

        return () => {
            isCancelled = true;
        }
    }, []);

    useEffect(() => {
        if (!makotoState) {
            return;
        }

        let isCancelled = false;

        (async () => {
            const unlisten = await appWindow.onCloseRequested(async (e) => {
                if (isCancelled) {
                    return;
                }

                try {
                    await try_serialize_state_to_disk(makotoState);
                }
                catch (err) {
                    e.preventDefault();
                }
            });

            shutdownListener.current();
            shutdownListener.current = unlisten;
        })();

        return () => {
            isCancelled = true;

            shutdownListener.current();
        }
    }, [makotoState]);
    
    if (!makotoState) {
        if (startupError) {
            return (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <p>{`${startupError.type} : ${startupError.message}`}</p>

                    <Button onClick={() => console.log("TODO")}>
                        Set to default
                    </Button>
                </div>
            );
        }

        return <p>loading...</p>;
    }
    
    return (
        <MakotoStateContext.Provider value={makotoState}>
            <MakotoStateDispatchContext.Provider value={dispatch}>
                {children}
            </MakotoStateDispatchContext.Provider>
        </MakotoStateContext.Provider>
    );
}
