import { FC, Fragment, ReactElement, useEffect } from "react";
import { Component } from "../../../interfaces/react_element";
import { PiHamburgerBold } from "react-icons/pi";
import { GrFormAdd } from "react-icons/gr";
import styles from "../../../scss/pages/admin.module.scss";
import { Link } from "react-router-dom";
import { useMenu } from "../../../hooks/useMenu";

export const MenuList: FC<Component> = ({}): ReactElement => {
    const { MenuItems, updateProducts } = useMenu();

    useEffect(() => {
        updateProducts();
    }, []);

    return (
        <Fragment>
            <div className={styles.list}>
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
