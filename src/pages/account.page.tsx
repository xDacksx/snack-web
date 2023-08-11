import { FC, ReactElement } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";
import styles from "../scss/pages/account.module.scss";
import { useAuth } from "../hooks/useAuth";
import { Link, NavLink, Outlet } from "react-router-dom";

export const AccountPage: FC<Component> = (): ReactElement => {
    const { AuthStatus } = useAuth();

    return (
        <Wall mode="need-auth">
            <div className={styles.accountPage}>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        <MyLink to="information" text="Account information" />
                        <MyLink to="change-password" text="Change password" />
                        {AuthStatus.user?.role === "admin" && (
                            <Link
                                className={styles.button}
                                to="/admin/dashboard"
                                children="Admin dashboard"
                            />
                        )}
                    </div>
                    <div className={styles.content}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </Wall>
    );
};

const MyLink: FC<MyLink> = ({ to, text }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                styles.button + (isActive ? ` ${styles.selected}` : "")
            }
            to={`/account/${to}`}
            children={text}
        />
    );
};

interface MyLink {
    to: string;
    text: string;
}
