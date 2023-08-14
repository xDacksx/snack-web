import axios from "axios";
import {
    MenuItem,
    MenuItemForm,
} from "../interfaces/menu-components.interface";
import { useWebToken } from "./useWebToken";
import { MenuContext, MenuItemsType } from "../context/menu.context";
import { useContext } from "react";
import { apiAddress } from "../context";

export const useMenu = () => {
    const { MenuItems, setMenuItems } = useContext(
        MenuContext
    ) as MenuItemsType;

    const { getHeader } = useWebToken();

    async function addProduct(product: MenuItemForm) {
        try {
            const Form = new FormData();
            Form.append("name", product.name);
            Form.append("description", product.description);
            Form.append("available", product.available ? "true" : "false");
            Form.append("quantity", `${product.quantity}`);
            Form.append("price", `${product.price}`);
            Form.append("image", product.image[0]);

            const { data: res } = await axios.post(
                `${apiAddress}/product/new`,
                Form,
                {
                    headers: { Authorization: getHeader() },
                }
            );

            const newProduct: MenuItem = res.data;

            setMenuItems([...MenuItems, newProduct]);
        } catch (error) {
            console.log(error);
        }
    }

    async function editProduct(product: editMenu, id: number) {
        try {
            const Form = new FormData();

            Form.append("available", product.available ? "true" : "false");

            if (product.name) Form.append("name", product.name);
            if (product.description)
                Form.append("description", product.description);
            if (product.quantity)
                Form.append("quantity", `${product.quantity}`);
            if (product.price) Form.append("price", `${product.price}`);

            if (product.image) Form.append("image", product.image[0]);

            const { data: res } = await axios.post(
                `${apiAddress}/product/${id}/edit`,
                Form,
                {
                    headers: { Authorization: getHeader() },
                }
            );

            console.log(res);

            // const newProduct: MenuItem = res.data;

            // setMenuItems([...MenuItems, newProduct]);
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProducts() {
        const { data } = await axios.get(`${apiAddress}/product`);

        if (data && data.data) {
            const products: MenuItem[] = data.data;
            setMenuItems(products);
        }
    }

    return { MenuItems, setMenuItems, addProduct, editProduct, updateProducts };
};

interface editMenu {
    name?: string;
    description?: string;
    quantity?: number;
    available?: boolean;
    price?: number;

    image?: FileList;
}
