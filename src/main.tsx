import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Router } from "./Router.tsx";
import "./scss/index.scss";
import React from "react";
import { AuthProvider } from "./context/auth.context.tsx";
import { NavProvider } from "./context/nav.context.tsx";
import { MenuProvider } from "./context/menu.context.tsx";
import { DeliveryProvider } from "./context/delivery.context.tsx";
import { ContactProvider } from "./context/contact.context.tsx";

ReactDOM.createRoot(document.getElementById("snack") as HTMLElement).render(
    <React.StrictMode>
        <AuthProvider>
            <NavProvider>
                <MenuProvider>
                    <DeliveryProvider>
                        <ContactProvider>
                            <RouterProvider router={Router} />
                        </ContactProvider>
                    </DeliveryProvider>
                </MenuProvider>
            </NavProvider>
        </AuthProvider>
    </React.StrictMode>
);
