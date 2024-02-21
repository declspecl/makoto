import "./styles.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorLogProvider } from "./components/ErrorLogProvider";
import { MakotoStateProvider } from "./components/MakotoStateProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorLogProvider>
            <MakotoStateProvider>
                <App />
            </MakotoStateProvider>
        </ErrorLogProvider>
    </React.StrictMode>
);
