import { useState } from "react";

export default function App() {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <button onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </button>
        </div>
    );
}
