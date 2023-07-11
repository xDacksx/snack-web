import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/menu.module.scss";
import { MenuItem } from "./menu-item";
import hamImage from "../../assets/hamburguer.png";

export const Menu: FC<Component> = ({}): ReactElement => {
    const desc =
        "The next range covers cases where the AR of the viewport is greater than 3/4 but less than 1/1. The next range covers casesssss";

    return (
        <div className={styles.menu}>
            <MenuItem
                image={hamImage}
                title="Double Beef"
                description={desc}
                price={20}
                stars={4.5}
            />
            <MenuItem
                image={hamImage}
                title="Double Beef"
                description={desc}
                price={20}
                stars={4.5}
            />
            <MenuItem
                image={hamImage}
                title="Double Beef"
                description={desc}
                price={20}
                stars={4.5}
            />
        </div>
    );
};
