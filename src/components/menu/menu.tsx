import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/menu.module.scss";
import { MenuItem } from "./menu-item";
import { useMenu } from "../../hooks/useMenu";

export const Menu: FC<Component> = ({}): ReactElement => {
    const { MenuItems } = useMenu();

    const isEmpty = MenuItems.filter((item) => item.available).length < 1;

    return (
        <div className={styles.menu}>
            {MenuItems.map(
                (product) =>
                    product.available && (
                        <MenuItem
                            image={product.imageUrl}
                            title={product.name}
                            description={product.description}
                            price={product.price}
                            stars={4.5}
                            key={product.id}
                        />
                    )
            )}

            {isEmpty && (
                <p className={styles.empty}>
                    Currently there are no products available :{"("}
                </p>
            )}
        </div>
    );
};
