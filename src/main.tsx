import ReactDOM from "react-dom/client";
import { Router } from "./Router.tsx";
import "./scss/index.scss";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { Providers } from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <Providers>
            <RouterProvider router={Router} />
        </Providers>
    </React.StrictMode>
);
