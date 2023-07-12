import { FC, ReactElement, Fragment, useEffect } from "react";
import { Component } from "./interfaces/react_element";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { useAuth } from "./hooks/useAuth";

export const App: FC<Component> = ({}): ReactElement => {
    const { Auth, AuthStatus, AppLoading } = useAuth();

    useEffect(() => {
        Auth();
    }, []);

    return (
        <Fragment>
            {AppLoading ? (
                <p>loading</p>
            ) : (
                <Fragment>
                    <Header />
                    <main>
                        <Outlet />
                        <span className="dev-info">
                            {JSON.stringify(AuthStatus.user)}
                        </span>
                    </main>
                </Fragment>
            )}
        </Fragment>
    );
};
