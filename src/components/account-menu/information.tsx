import { FC, ReactElement, useState, useEffect } from "react";
import { Component } from "../../interfaces/react_element";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../scss/pages/account.module.scss";

export const AccountInformation: FC<Component> = (): ReactElement => {
    const { AuthStatus, GetGender, GetRole } = useAuth();

    const [genderName, setGenderName] = useState("");
    const [roleName, setRoleName] = useState("");

    useEffect(() => {
        async function gender() {
            const gender = await GetGender(AuthStatus.user?.genderId ?? 0);
            if (!gender) return;
            setGenderName(gender.name);
        }
        async function role() {
            const role = await GetRole(AuthStatus.user?.roleId ?? 0);
            if (!role) return;
            setRoleName(role.name);
        }
        gender();
        role();
    }, []);

    return (
        <div className={styles.accountInfo}>
            <h4>Email</h4>
            <p>{AuthStatus.user?.email}</p>
            <h4>Name</h4>
            <p>{AuthStatus.user?.name}</p>
            <h4>Lastname</h4>
            <p>{AuthStatus.user?.lastname}</p>
            <h4>Gender</h4>
            <p>{genderName}</p>
            <h4>Role</h4>
            <p>{roleName}</p>
            <h4>Account creation</h4>
            <p>{AuthStatus.user?.createdAt.toString()}</p>
        </div>
    );
};
