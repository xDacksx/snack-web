import { FC, Fragment, ReactElement, useState } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";
import styles from "../scss/pages/admin.module.scss";
import { EditMenu } from "../components/admin/edit-menu";

export const AdminPage: FC<Component> = ({}): ReactElement => {
    interface section {
        id: number;
        name: string;
        component: JSX.Element;
        selected: boolean;
    }
    const sectionsDefault: section[] = [
        {
            id: 1,
            name: "Edit menu items",
            component: <EditMenu />,
            selected: true,
        },
        {
            id: 2,
            name: "Delivery management",
            component: <p></p>,
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
        <Wall mode="admin">
            <div className={styles.adminPage}>
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
