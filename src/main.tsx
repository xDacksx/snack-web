import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Router } from "./Router.tsx";
import "./scss/index.scss";
import React from "react";
import { AuthProvider } from "./context/auth.context.tsx";
import { NavProvider } from "./context/nav.context.tsx";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <NavProvider>
                <RouterProvider router={Router} />
            </NavProvider>
        </AuthProvider>
    </React.StrictMode>
);
