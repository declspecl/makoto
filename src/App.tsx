import { useEffect } from "react";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";
import { Button } from "./components/ui/Button";
import { Tag } from "./backend/tag";
import { hexColorToRgbColor } from "./backend/utils";

export default function App() {
    const makotoState = useMakotoStateContext();
    const dispatch = useMakotoStateDispatchContext();

    useEffect(() => {
        console.log(makotoState);
    }, [makotoState]);

    return (
        <div>
            <Button onClick={() => {
                let newTag: Tag = {
                    name: "test title",
                    description: "test desc",
                    color: hexColorToRgbColor("#ffffff")
                };

                dispatch({ type: "addTag", tag: newTag });
            }}>
                add tag
            </Button>

            <p>{JSON.stringify(makotoState.data.tags, null, 2)}</p>
        </div>
    );
}