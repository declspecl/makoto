import { useEffect } from "react";
import { Tag } from "./backend/tag";
import { Button } from "./components/ui/Button";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";

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
                    color: "#ffffff"
                };

                // TODO: add error boundary so that adding duplicate tags doesnt kaboom the UI
                dispatch({ type: "addTag", tag: newTag });
            }}>
                add tag
            </Button>
            
            {makotoState.data.tag_pool.map((tag) => (
                <div key={tag.name}>
                    <h6>{tag.name}</h6>
                    <p>{tag.description}</p>
                    <p>{tag.color}</p>
                </div>
            ))}
        </div>
    );
}