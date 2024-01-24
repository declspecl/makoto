import "./styles.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorLogContext } from "./contexts/ErrorLog";
import { MakotoStateLoader } from "./components/MakotoStateLoader";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorLogContext.Provider value={[]}>
            <MakotoStateLoader>
                <App />
            </MakotoStateLoader>
        </ErrorLogContext.Provider>
    </React.StrictMode>
);