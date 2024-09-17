import "./main.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorLogProvider } from "./context/ErrorLogProvider";
import { MakotoStateProvider } from "./context/MakotoStateProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorLogProvider>
            <MakotoStateProvider>
                <App />
            </MakotoStateProvider>
        </ErrorLogProvider>
    </React.StrictMode>
);
