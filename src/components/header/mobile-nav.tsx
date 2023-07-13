import { FC, Fragment, ReactElement, useContext } from "react";
import { Component } from "../../interfaces/react_element";
import style from "../../scss/components/header.module.scss";

import { CgMenuBoxed } from "react-icons/cg";
import { NavContext, NavStatusType } from "../../context/nav.context";
import { Link } from "react-router-dom";

export const MobileNav: FC<Component> = (): ReactElement => {
    const { setNavStatus, NavStatus } = useContext(NavContext) as NavStatusType;

    return (
        <Fragment>
            <button
                className={style.btn + " " + style.btnZoom + " " + style.mobile}
                onClick={() => setNavStatus(!NavStatus)}
            >
                <CgMenuBoxed />
            </button>
            <div
                className={
                    style.mobile_nav + (NavStatus ? ` ${style.open}` : "")
                }
            >
                <Link to="/">Home</Link>
                <Link to="/">Menu</Link>
                <Link to="/">Info</Link>
                <Link to="/">Account</Link>
            </div>
        </Fragment>
    );
};
