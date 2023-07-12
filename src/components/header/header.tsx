import style from "../../scss/components/header.module.scss";
import { Component } from "../../interfaces/react_element";
import { BsCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { FC, ReactElement, Fragment } from "react";
import { Nav } from "./nav";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const Header: FC<Component> = ({}): ReactElement => {
    const { AuthStatus } = useAuth();

    let username: string = "";

    if (AuthStatus.user)
        username =
            AuthStatus.user.name + " " + AuthStatus.user.lastname.slice(0, 1);

    return (
        <header className={style.header}>
            <h1 className={style.h1}>Snack Hunt</h1>
            <Nav />
            <div className={style.account}>
                {username.length > 0 ? (
                    <Fragment>
                        <p className={style.phone}>{username}</p>
                        <span className={style.info}>
                            <button>
                                <BsCartFill />
                            </button>
                            <button className={style.user}>
                                <BiSolidUser />
                            </button>
                        </span>
                    </Fragment>
                ) : (
                    <Link to="/auth/sign-up" className={style.noAuthBtn}>
                        Create an account
                    </Link>
                )}
            </div>
        </header>
    );
};
