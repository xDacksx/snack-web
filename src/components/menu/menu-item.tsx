import { FC, ReactElement } from "react";
import styles from "../../scss/components/menu.module.scss";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const MenuItem: FC<MenuItem> = ({
    image,
    title,
    description,
    price,
    stars,
}): ReactElement => {
    stars = Math.round(stars);

    if (stars < 0) stars = 0;
    if (stars > 5) stars = 5;

    const rest = Array.from(Array(5 - stars));
    const stars_ = Array.from(Array(stars));

    if (description.length > 125)
        description = description.slice(0, 124) + "...";

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <img src={image} alt={title} />
            </div>
            <div className={styles.info}>
                <h3>{title}</h3>
                <p>{description}</p>
                <span className={styles.quality}>
                    <span className={styles.price}>
                        <span className={styles.ball} /> ${price}
                    </span>
                    <span className={styles.stars}>
                        {stars_.map((_e, i) => (
                            <AiFillStar key={i} />
                        ))}
                        {rest.map((_e, i) => (
                            <AiOutlineStar key={i} />
                        ))}
                        <p>{stars}</p>
                    </span>
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
    stars: number;
}
