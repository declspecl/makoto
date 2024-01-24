import { useContext } from "react";
import { MakotoState } from "./backend/state";
import { StateContext } from "./contexts/StateContext";

export default function App() {
    const makotoState = useContext<MakotoState>(StateContext);

    return (
        <p>{JSON.stringify(makotoState, null, 2)}</p>
    );
}