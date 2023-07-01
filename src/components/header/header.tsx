import style from "../../scss/components/header.module.scss";
import { Component } from "../../interfaces/react_element";
import { BsCartFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { FC, ReactElement } from "react";
import { Nav } from "./nav";

export const Header: FC<Component> = ({}): ReactElement => {
    return (
        <header className={style.header}>
            <h1 className={style.h1}>Snack Hunt</h1>
            <Nav />
            <div className={style.account}>
                <p className={style.phone}>Diego Z</p>
                <span className={style.info}>
                    <button>
                        <BsCartFill />
                    </button>
                    <button className={style.user}>
                        <BiSolidUser />
                    </button>
                </span>
            </div>
        </header>
    );
};
