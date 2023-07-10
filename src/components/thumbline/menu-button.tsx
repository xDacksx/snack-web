import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";

export const MenuButton: FC<Component> = ({ className }): ReactElement => {
    return (
        <Link className={className} to="/">
            <BiShoppingBag /> See the menu
        </Link>
    );
};
