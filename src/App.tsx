import { useEffect, useMemo } from "react";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";
import { Button } from "./components/ui/Button";
import { Tag } from "./backend/tag";
import { hexColorToRgbColor, rgbColorToHexColor } from "./backend/utils";

export default function App() {
    const makotoState = useMakotoStateContext();
    const dispatch = useMakotoStateDispatchContext();

    const tags: Tag[] = useMemo(
        () => {
            const tempTags: Tag[] = [];

            makotoState.data.tags.forEach((tag) => {
                tempTags.push(tag);
            })

            return tempTags;
        },
        [makotoState]
    );

    useEffect(() => {
        console.log(makotoState);
    }, [makotoState]);

    return (
        <div>
            <Button onClick={() => {
                let newTag: Tag = {
                    name: "test title",
                    description: "test desc",
                    color: { r: 205, g: 10, b: 0 }
                };

                dispatch({ type: "addTag", tag: newTag });
            }}>
                add tag
            </Button>

            {tags.map((tag) => (
                <div>
                    <p>{tag.name}</p>
                    <p>{tag.description}</p>
                    <p>{rgbColorToHexColor(tag.color)}</p>
                </div>
            ))}
        </div>
    );
}