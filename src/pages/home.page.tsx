import { FC, ReactElement, Fragment } from "react";
import { Component } from "../interfaces/react_element";
import { Thumbline } from "../components/thumbline/thumbline";
import { Menu } from "../components/menu/menu";

export const HomePage: FC<Component> = ({}): ReactElement => {
    return (
        <Fragment>
            <Thumbline />
            <Menu />
        </Fragment>
    );
};
