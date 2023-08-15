import { FC, ReactElement, MouseEvent, useState } from "react";
import styles from "../../scss/components/menu.module.scss";
import { useCart } from "../../hooks/useCart";
import { RiForbid2Fill } from "react-icons/ri";

export const MenuItem: FC<MenuItem> = ({
    image,
    title,
    description,
    price,
    quantity,
    id,
}): ReactElement => {
    const ogTitle = title;
    const ogDesc = description;

    const [shown, setShown] = useState(false);
    const [status, setStatus] = useState(false);

    if (description.length > 125)
        description = description.slice(0, 124) + "...";

    if (title.length > 23) title = title.slice(0, 22) + "...";

    const { addProduct } = useCart();

    async function add(_e: MouseEvent) {
        const { added } = await addProduct(id);

        setStatus(added);
        setShown(true);

        setTimeout(() => {
            setShown(false);
        }, 750);
    }

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
                    <button onClick={add} className={styles.addToCart}>
                        Add
                        <span
                            className={`${styles.noti}${
                                !status ? ` ${styles.fail}` : ""
                            }${shown ? ` ${styles.shown}` : ""} `}
                        >
                            {status ? "+1" : <RiForbid2Fill />}
                        </span>
                    </button>
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
    id: number;
}
