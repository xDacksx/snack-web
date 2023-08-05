import { FC, Fragment, ReactElement, useEffect, useContext } from "react";
import { Component } from "../../../interfaces/react_element";
import { PiHamburgerBold } from "react-icons/pi";
import { GrFormAdd } from "react-icons/gr";
import styles from "../../../scss/pages/admin.module.scss";
import { MenuItem } from "../../../interfaces/menu-components.interface";
import { MenuContext, MenuItemsType } from "../../../context/menu.context";
import { Link } from "react-router-dom";

export const MenuList: FC<Component> = ({}): ReactElement => {
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

    const { MenuItems, setMenuItems } = useContext(
        MenuContext
    ) as MenuItemsType;

    function GetItems() {
        const data = localStorage.getItem("menu-items");

        if (!data) {
            localStorage.setItem(
                "menu-items",
                JSON.stringify([newItem(1), newItem(2)])
            );
            setMenuItems([newItem(1), newItem(2)]);

            return;
        }
        const items: MenuItem[] = JSON.parse(data);
        setMenuItems(items);
    }

    useEffect(() => {
        GetItems();
    }, []);

    return (
        <Fragment>
            <div className={styles.edit}>
                {MenuItems.map((item) => (
                    <Link
                        to={`item/${item.id.toString()}`}
                        className={styles.item}
                        key={item.id}
                    >
                        <PiHamburgerBold /> <p>{item.name}</p>
                    </Link>
                ))}
                <Link to="new" className={`${styles.addBtn}`}>
                    <GrFormAdd />
                </Link>
            </div>
        </Fragment>
    );
};
