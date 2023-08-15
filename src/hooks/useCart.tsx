import { useContext } from "react";
import {
    CartContext,
    CartItemsType,
    CountProducts,
} from "../context/cart.context";
import axios from "axios";
import { useWebToken } from "./useWebToken";
import { apiAddress } from "../context";
import { Product } from "../interfaces/cart.interface";

export const useCart = () => {
    const { CartItems, setCartItems } = useContext(
        CartContext
    ) as CartItemsType;

    const { getHeader, getToken } = useWebToken();

    async function refreshCart() {
        try {
            if (getToken()) {
                const { data } = await axios.get(`${apiAddress}/user/cart`, {
                    headers: { Authorization: getHeader() },
                });

                const products: Product[] = data;

                setCartItems(CountProducts(products));
            }
        } catch (error) {
            if (error instanceof Error) console.warn(error.message);
        }
    }
    async function buyCart(location: string) {
        try {
            const Form = new FormData();

            Form.append("location", location);

            const { data } = await axios.post(
                `${apiAddress}/user/cart/buy`,
                Form,
                { headers: { Authorization: getHeader() } }
            );

            if (data.url) {
                window.location = data.url;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function addProduct(id: number) {
        try {
            const { data } = await axios.post(
                `${apiAddress}/user/cart`,
                {
                    id,
                },
                {
                    headers: { Authorization: getHeader() },
                }
            );

            if (data.added) await refreshCart();

            return data;

            // if (data.deleted) await refreshCart();
        } catch (error) {
            return {
                added: false,
                msg: "",
            };
        }
    }
    async function deleteProduct(id: number) {
        try {
            const { data } = await axios.delete(`${apiAddress}/user/cart`, {
                headers: { Authorization: getHeader() },
                data: { id },
            });

            if (data.deleted) await refreshCart();
        } catch (error) {
            console.log(error);
        }
    }

    return { CartItems, buyCart, deleteProduct, refreshCart, addProduct };
};
