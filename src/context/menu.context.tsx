import { FC, createContext, useState, useEffect } from "react";
import { ReactElement } from "../interfaces/react_element";
import { MenuItem } from "../interfaces/menu-components.interface";
import axios from "axios";
import { apiAddress } from ".";

export const MenuContext = createContext<MenuItemsType | null>(null);

export const MenuProvider: FC<ReactElement> = ({ children }): JSX.Element => {
    async function GetItems() {
        const { data } = await axios.get(`${apiAddress}/product`);

        if (data && data.data) {
            const products: MenuItem[] = data.data;
            setMenuItems(products);
        }
    }

    useEffect(() => {
        GetItems();
    }, []);

    const [MenuItems, setMenuItems] = useState<MenuItem[]>([]);

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
