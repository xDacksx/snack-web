import { Component } from "../../interfaces/react_element";
import style from "../../scss/components/header.module.scss";
import { FC, ReactElement } from "react";
import { Link } from "react-router-dom";

export const Nav: FC<Component> = ({}): ReactElement => {
    return (
        <nav className={style.nav}>
            <Link to="/">Home</Link>
            <a href="#menu">Menu</a>
            <a href="#information">Info</a>
        </nav>
    );
};
