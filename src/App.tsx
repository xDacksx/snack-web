import { FC, ReactElement, Fragment, useEffect } from "react";
import { Component } from "./interfaces/react_element";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { useAuth } from "./hooks/useAuth";

export const App: FC<Component> = ({}): ReactElement => {
    const { Auth } = useAuth();

    useEffect(() => {
        Auth();
    }, []);

    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
};
