import { FC, ReactElement } from "react";
import styles from "../../scss/components/menu.module.scss";

export const MenuItem: FC<MenuItem> = ({
    image,
    title,
    description,
    price,
    quantity,
}): ReactElement => {
    const ogTitle = title;
    const ogDesc = description;

    if (description.length > 125)
        description = description.slice(0, 124) + "...";

    if (title.length > 23) title = title.slice(0, 22) + "...";

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.info}>
                <div className={styles.text}>
                    <h3 title={ogTitle}>{title}</h3>
                    <h4>{quantity} left</h4>
                    <p title={ogDesc}>{description}</p>
                </div>
                <span className={styles.quality}>
                    <span className={styles.price}>
                        <span className={styles.ball} /> ${price.toFixed(2)}
                    </span>
                    <button className={styles.addToCart}>Add</button>
                </span>
            </div>
        </div>
    );
};

interface MenuItem {
    image: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
}
