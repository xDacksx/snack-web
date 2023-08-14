import { FC, Fragment, ReactElement, useContext } from "react";
import { Component } from "../../interfaces/react_element";
import style from "../../scss/components/header.module.scss";
import { CgMenuBoxed } from "react-icons/cg";
import { NavContext, NavStatusType } from "../../context/nav.context";
import { useAuth } from "../../hooks/useAuth";
import { MobileLink } from "./mobile-link";

export const MobileNav: FC<Component> = (): ReactElement => {
    const { setNavStatus, NavStatus } = useContext(NavContext) as NavStatusType;
    const { LogOut, AuthStatus } = useAuth();

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
                <MobileLink to="/" children="Home" />

                {AuthStatus.user ? (
                    <Fragment>
                        <MobileLink to="/account" children="Account" />
                        <MobileLink to="/account/cart" children="Cart" />
                        <MobileLink
                            to="/"
                            children="Log out"
                            onClick={LogOut}
                        />
                    </Fragment>
                ) : (
                    <MobileLink to="/auth/sign-up" children="Sign up" />
                )}
            </div>
        </Fragment>
    );
};
