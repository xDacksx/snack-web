import { FC, ReactElement, Fragment } from "react";
import { Component } from "./interfaces/react_element";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";

export const App: FC<Component> = ({}): ReactElement => {
    return (
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
};
