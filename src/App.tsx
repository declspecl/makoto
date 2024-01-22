import { useState } from "react";
import { Button } from "@components/ui/Button";

export default function App() {
    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <Button variant="default" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>

            <Button variant="secondary" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>

            <Button variant="outline" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>

            <Button variant="ghost" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>

            <Button variant="destructive" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>

            <Button variant="link" onClick={() => setCount((prev) => prev + 1)}>
                {count}
            </Button>
        </div>
    );
}