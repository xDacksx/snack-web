import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./scss/index.scss";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
