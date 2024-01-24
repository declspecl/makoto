import { useState } from "react";
import { Button } from "@components/ui/Button";
import { try_deserialize_from_config_file, try_serialize_default_config } from "./backend/commands";

export default function App() {
    return (
        <div>
            <Button
                variant="default"
                onClick={async () => {
                    try {
                        await try_serialize_default_config();
                    }
                    catch (e) {
                        console.error(e);
                    }
                }}
            >
                Try serialize
            </Button>

            <Button
                variant="secondary"
                onClick={async () => {
                    try {
                        const config = await try_deserialize_from_config_file();

                        console.log(config);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }}
            >
                Try DEserialize
            </Button>
        </div>
    );
}