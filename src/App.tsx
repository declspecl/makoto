import { useEffect } from "react";
import { Tag } from "./backend/tag";
import { Button } from "./components/ui/Button";
import { useMakotoStateContext, useMakotoStateDispatchContext } from "./contexts/MakotoStateContext";
import { Calendar } from "./pages/Calendar";

export default function App() {
    const makotoState = useMakotoStateContext();
    const dispatch = useMakotoStateDispatchContext();

    useEffect(() => {
        console.log(makotoState);
    }, [makotoState]);

    return (
        <Calendar />
    );
}
