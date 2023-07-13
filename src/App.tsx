import { FC, ReactElement, Fragment, useEffect, useContext } from "react";
import { Component } from "./interfaces/react_element";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { useAuth } from "./hooks/useAuth";
import { NavContext, NavStatusType } from "./context/nav.context";

export const App: FC<Component> = ({}): ReactElement => {
    const { Auth, AuthStatus, AppLoading } = useAuth();

    const { NavStatus } = useContext(NavContext) as NavStatusType;

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
                    <main className={NavStatus ? "nav-open" : ""}>
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
