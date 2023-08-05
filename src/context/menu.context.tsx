import { FC, createContext, useState } from "react";
import { ReactElement } from "../interfaces/react_element";
import { MenuItem } from "../interfaces/menu-components.interface";

export const MenuContext = createContext<MenuItemsType | null>(null);

export const MenuProvider: FC<ReactElement> = ({ children }): JSX.Element => {
    function GetItems() {
        const data = localStorage.getItem("menu-items");

        if (!data) {
            localStorage.setItem(
                "menu-items",
                JSON.stringify([newItem(1), newItem(2)])
            );
            return [newItem(1), newItem(2)];
        }
        const items: MenuItem[] = JSON.parse(data);
        return items;
    }

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

    const [MenuItems, setMenuItems] = useState<MenuItem[]>(GetItems());

    return (
        <MenuContext.Provider
            value={{ MenuItems, setMenuItems }}
            children={children}
        />
    );
};

export type MenuItemsType = {
    MenuItems: MenuItem[];
    setMenuItems: (value: MenuItem[]) => void;
};
