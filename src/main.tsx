import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Router } from "./Router.tsx";
import "./scss/index.scss";
import React from "react";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={Router} />
    </React.StrictMode>
);
