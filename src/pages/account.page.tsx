import { FC, Fragment, ReactElement, useState } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";
import styles from "../scss/pages/account.module.scss";
import { AccountInformation } from "../components/account-menu/information";
import { AccountChangePassword } from "../components/account-menu/change-password";

export const AccountPage: FC<Component> = (): ReactElement => {
    interface section {
        id: number;
        name: string;
        component: JSX.Element;
        selected: boolean;
    }
    const sectionsDefault: section[] = [
        {
            id: 1,
            name: "Account information",
            component: <AccountInformation />,
            selected: true,
        },
        {
            id: 2,
            name: "Change password",
            component: <AccountChangePassword />,
            selected: false,
        },
    ];

    const [sections, setSections] = useState<section[]>(sectionsDefault);

    function changeSection(name: string) {
        const filtered = sections.filter((e) => e.name !== name);
        filtered.forEach((e) => (e.selected = false));

        const This = sections.filter((e) => e.name === name)[0];
        This.selected = true;

        const newSections = [...filtered, This];

        newSections.sort((a, b) => a.id - b.id);

        setSections(newSections);
    }

    return (
        <Wall mode="need-auth">
            <div className={styles.accountPage}>
                <div className={styles.container}>
                    <div className={styles.menu}>
                        {sections.map((e, i) => (
                            <button
                                key={i}
                                className={`${styles.button} ${
                                    e.selected ? styles.selected : ""
                                }`}
                                type="button"
                                onClick={() => changeSection(e.name)}
                            >
                                {e.name}
                            </button>
                        ))}
                    </div>
                    <div className={styles.content}>
                        {sections.map((e, i) => (
                            <Fragment key={i}>
                                {e.selected && e.component}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </Wall>
    );
};
