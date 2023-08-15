import { FC, ReactElement, useEffect, useState, FormEvent } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";
import styles from "../scss/pages/cart.module.scss";
import { useCart } from "../hooks/useCart";

export const CartPage: FC<Component> = ({}): ReactElement => {
    const { CartItems, buyCart, refreshCart, deleteProduct, addProduct } =
        useCart();

    const [Street, setStreet] = useState("");

    const totalAmount =
        CartItems.length > 0
            ? CartItems.map(
                  (item) => item.product.price * item.quantity
              ).reduce((a, b) => a + b)
            : 0;

    useEffect(() => {
        refreshCart();
    }, []);

    async function Submit(e: FormEvent) {
        e.preventDefault();

        await buyCart(Street);
    }

    return (
        <Wall mode="need-auth">
            <div className={styles.cartPage}>
                <div className={styles.container}>
                    <div className={styles.cart}>
                        {CartItems.map((item, i) => (
                            <span key={i} className={styles.item}>
                                <h2>
                                    {item.product.name} ${item.product.price}
                                </h2>
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                />
                                <div className={styles.btns}>
                                    <button
                                        className={styles.btn}
                                        onClick={() =>
                                            deleteProduct(item.product.id)
                                        }
                                    >
                                        -
                                    </button>
                                    <label> {item.quantity} </label>
                                    <button
                                        className={styles.btn}
                                        onClick={() =>
                                            addProduct(item.product.id)
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </span>
                        ))}
                        {CartItems.length < 1 && (
                            <h2 className={styles.no}>
                                You have no products on your cart
                            </h2>
                        )}
                    </div>
                    <form className={styles.checkout} onSubmit={Submit}>
                        <input
                            type="text"
                            placeholder="Street"
                            onChange={(e) => setStreet(e.target.value)}
                        />
                        <p className={styles.total}>
                            Total: $
                            {CartItems.length > 0
                                ? totalAmount.toFixed(2)
                                : (0).toFixed(2)}
                        </p>
                        <button
                            className={styles.btn}
                            type="submit"
                            disabled={CartItems.length < 1 || Street.length < 1}
                        >
                            BUY
                        </button>
                    </form>
                </div>
            </div>
        </Wall>
    );
};
