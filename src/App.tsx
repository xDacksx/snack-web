import { FC, ReactElement } from "react";
import { Component } from "./interfaces/react_element";
import { Outlet } from "react-router-dom";

export const App: FC<Component> = ({}): ReactElement => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
