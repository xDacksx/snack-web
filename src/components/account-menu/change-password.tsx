import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/pages/account.module.scss";

export const AccountChangePassword: FC<Component> = ({}): ReactElement => {
    return (
        <form className={styles.changePass}>
            <input type="text" placeholder="Current password" />
            <input type="text" placeholder="New password" />
            <input type="text" placeholder="Confirm password" />
            <button className={styles.btn} type="submit">
                Save
            </button>
        </form>
    );
};
