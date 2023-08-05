import { FC, ReactElement } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";
import styles from "../scss/pages/admin.module.scss";
import { NavLink, Outlet } from "react-router-dom";

export const AdminPage: FC<Component> = ({}): ReactElement => {
    return (
        <Wall mode="admin">
            <div className={styles.adminPage}>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <Link to="menu" text="Menu management" />
                        <Link to="delivery" text="Delivery management" />
                    </div>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Wall>
    );
};

const Link: FC<Link> = ({ to, text }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                styles.button + (isActive ? ` ${styles.selected}` : "")
            }
            to={`/admin/dashboard/${to}`}
            children={text}
        />
    );
};

interface Link {
    to: string;
    text: string;
}
