import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/thumbline.module.scss";
import { MenuButton } from "./menu-button";
import hamImage from "../../assets/thumb_hamburguer.png";

export const Thumbline: FC<Component> = ({}): ReactElement => {
    return (
        <div className={styles.thumbline}>
            <div className={styles.first}>
                <h3>The original burger</h3>
                <h2>Savory & delicious</h2>
                <p>
                    Delicious burgers made from high-quality Australian beef,
                    carefully processed to create a juicy and flavorful taste.
                </p>
                <MenuButton className={styles.button} />
            </div>
            <div className={styles.second}>
                <img src={hamImage} alt="hamburguer" />
            </div>
        </div>
    );
};
