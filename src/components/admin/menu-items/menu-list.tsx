import { FC, Fragment, ReactElement, useEffect, useState } from "react";
import { Component } from "../../../interfaces/react_element";
import { PiHamburgerBold } from "react-icons/pi";
import { GrFormAdd } from "react-icons/gr";
import styles from "../../../scss/pages/admin.module.scss";
import { MenuForm } from "./menu-form";
import { MenuItem } from "../../../interfaces/menu-components.interface";

export const MenuList: FC<Component> = ({}): ReactElement => {
    const [addMode, setAddMode] = useState(false);

    function newItem(id: number): MenuItem {
        const item: MenuItem = {
            id: id,
            name: "Item",
            description: "Lorem",
            available: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return item;
    }

    const [Items, setItems] = useState<MenuItem[]>([]);

    function GetItems() {
        const data = localStorage.getItem("menu-items");

        if (!data) {
            localStorage.setItem(
                "menu-items",
                JSON.stringify([newItem(1), newItem(2)])
            );
            setItems([newItem(1), newItem(2)]);

            return;
        }
        const items: MenuItem[] = JSON.parse(data);
        setItems(items);
    }

    useEffect(() => {
        GetItems();
    }, []);

    return (
        <Fragment>
            <div className={styles.edit}>
                {Items.map((item) => (
                    <button className={styles.item} type="button" key={item.id}>
                        <PiHamburgerBold /> <p>{item.name}</p>
                    </button>
                ))}
                <button
                    className={`${styles.addBtn}`}
                    type="button"
                    onClick={() => setAddMode(true)}
                >
                    <GrFormAdd />
                </button>
            </div>
            {addMode && (
                <MenuForm
                    Items={Items}
                    setAddMode={setAddMode}
                    setItems={setItems}
                />
            )}
        </Fragment>
    );
};
