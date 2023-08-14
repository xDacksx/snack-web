import { FC, ReactElement } from "react";
import { Component } from "../interfaces/react_element";
import { AuthProvider } from "../context/auth.context.tsx";
import { NavProvider } from "../context/nav.context.tsx";
import { MenuProvider } from "../context/menu.context.tsx";
import { DeliveryProvider } from "../context/delivery.context.tsx";
import { ContactProvider } from "../context/contact.context.tsx";
import { CartProvider } from "../context/cart.context.tsx";

export const apiAddress = `http://${window.location.hostname}:5000`;

export const Providers: FC<Component> = ({ children }): ReactElement => {
    return (
        <AuthProvider>
            <NavProvider>
                <MenuProvider>
                    <DeliveryProvider>
                        <ContactProvider>
                            <CartProvider>{children}</CartProvider>
                        </ContactProvider>
                    </DeliveryProvider>
                </MenuProvider>
            </NavProvider>
        </AuthProvider>
    );
};
