import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../scss/components/account/information.module.scss";

export const AccountInformation: FC<Component> = (): ReactElement => {
    const { AuthStatus } = useAuth();

    return (
        <div className={styles.accountInfo}>
            <h4>Email</h4>
            <p>{AuthStatus.user?.email}</p>
            <h4>Name</h4>
            <p>{AuthStatus.user?.name}</p>
            <h4>Lastname</h4>
            <p>{AuthStatus.user?.lastname}</p>
            <h4>Gender</h4>
            <p>{AuthStatus.user?.gender}</p>
            <h4>Role</h4>
            <p>{AuthStatus.user?.role}</p>
            <h4>Account creation</h4>
            <p>{AuthStatus.user?.createdAt.toString()}</p>
        </div>
    );
};
