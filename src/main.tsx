import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Router } from "./Router.tsx";
import "./scss/index.scss";
import React from "react";
import { AuthProvider } from "./context/auth.context.tsx";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={Router} />
        </AuthProvider>
    </React.StrictMode>
);
