import "./styles.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorLogContext } from "./contexts/ErrorLog";
import { MakotoStateProvider } from "./components/MakotoStateProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorLogContext.Provider value={[]}>
            <MakotoStateProvider>
                <App />
            </MakotoStateProvider>
        </ErrorLogContext.Provider>
    </React.StrictMode>
);