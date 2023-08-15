import { FC, createContext, useState, useEffect } from "react";
import { ReactElement } from "../interfaces/react_element";
import axios from "axios";
import { CartItem, Product } from "../interfaces/cart.interface";
import { useWebToken } from "../hooks/useWebToken";
import { apiAddress } from ".";

export const CartContext = createContext<CartItemsType | null>(null);

export function CountProducts(data: Product[]) {
    const CartItems: CartItem[] = [];

    const itemCount: { [key: number]: number } = {};

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        if (element.available && element.quantity > 0) {
            const productId = element.id || 0;
            itemCount[productId] = (itemCount[productId] || 0) + 1;
        }
    }

    for (const key in itemCount) {
        const quantity = itemCount[key];
        const id: number = parseInt(key);

        const product = data.find((obj) => obj.id === id);

        if (product) {
            const CartItem = { quantity, product };

            CartItems.push(CartItem);
        }
    }

    return CartItems;
}

export const CartProvider: FC<ReactElement> = ({ children }): JSX.Element => {
    const { getHeader, getToken } = useWebToken();

    async function GetItems() {
        try {
            if (getToken()) {
                const { data } = await axios.get(`${apiAddress}/user/cart`, {
                    headers: { Authorization: getHeader() },
                });

                if (!data.errors) {
                    const products: Product[] = data;
                    setCartItems(CountProducts(products));
                }
            }
        } catch (error) {
            if (error instanceof Error) console.warn(error.message);
        }
    }

    useEffect(() => {
        GetItems();
    }, []);

    const [CartItems, setCartItems] = useState<CartItem[]>([]);

    return (
        <CartContext.Provider
            value={{ CartItems: CartItems, setCartItems: setCartItems }}
            children={children}
        />
    );
};

export type CartItemsType = {
    CartItems: CartItem[];
    setCartItems: (value: CartItem[]) => void;
};
