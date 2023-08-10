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
    const ogTitle = title;
    const ogDesc = description;

    if (stars < 0) stars = 0;
    if (stars > 5) stars = 5;

    const rest = Array.from(Array(5 - stars));
    const stars_ = Array.from(Array(stars));

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
                    <p title={ogDesc}>{description}</p>
                </div>
                <span className={styles.quality}>
                    <span className={styles.price}>
                        <span className={styles.ball} /> ${price.toFixed(2)}
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
