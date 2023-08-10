import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import { BiShoppingBag } from "react-icons/bi";

export const MenuButton: FC<Component> = ({ className }): ReactElement => {
    return (
        <a className={className} href="#menu">
            <BiShoppingBag /> See the menu
        </a>
    );
};
