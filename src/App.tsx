import { useEffect } from "react";
import { Calendar } from "./pages/Calendar";
import { appWindow } from "@tauri-apps/api/window";
import { try_serialize_state_to_disk } from "./backend/commands";
import { useMakotoStateContext } from "./contexts/MakotoStateContext";
import { PartitionBuilder } from "./components/PartitionBuilder";

export default function App() {
    const state = useMakotoStateContext();

    useEffect(() => {
        appWindow.onCloseRequested(() => {
            try_serialize_state_to_disk(state)
                .then(() => {
                    console.log("successfully serialized to disk")
                })
                .catch((err) => {
                    console.error(err);
                });
        })
    }, [state]);

    return (
        <div className="w-full h-full">
            <PartitionBuilder />
        </div>
    );
}
