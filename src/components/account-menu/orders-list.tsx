import { FC, ReactElement, useEffect, useState } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/account/orders.module.scss";
import axios from "axios";
import { apiAddress } from "../../context";
import { useWebToken } from "../../hooks/useWebToken";
import { Link } from "react-router-dom";
import { LuPackageCheck } from "react-icons/lu";
import { MdAttachMoney } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

export const OrdersList: FC<Component> = ({}): ReactElement => {
    const [orders, setOrders] = useState<any[]>([]);
    const { getHeader } = useWebToken();

    async function getOrders() {
        try {
            const { data } = await axios.get(`${apiAddress}/user/orders`, {
                headers: { Authorization: getHeader() },
            });

            setOrders(data);
        } catch (error) {}
    }

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <ul className={styles.list}>
            {orders.map((order) => {
                return (
                    <li key={order.id}>
                        <span className={styles.item}>
                            <div className={styles.info}>
                                <h2 className={styles.money}>
                                    ${order.total.toFixed(2)}
                                </h2>
                                <h3 className={styles.address}>
                                    {order.location}
                                </h3>
                                <h4 className={styles.id}>{order.id}</h4>
                                <h4 className={styles.date}>
                                    {new Date(order.date)
                                        .toISOString()
                                        .slice(0, 10)}
                                </h4>
                            </div>
                            <div className={styles.actions}>
                                {order.paid ? (
                                    <span
                                        className={`${styles.payment} ${styles.paid}`}
                                    >
                                        <MdAttachMoney />
                                        Paid confirmed
                                    </span>
                                ) : (
                                    <a
                                        href={order.url}
                                        className={styles.payment}
                                    >
                                        <MdAttachMoney />
                                        Pay
                                    </a>
                                )}
                                {order.delivered ? (
                                    <span
                                        className={`${styles.payment} ${styles.inway}`}
                                    >
                                        Delivered
                                        <LuPackageCheck />
                                    </span>
                                ) : (
                                    <span
                                        className={`${styles.payment} ${styles.delivered}`}
                                    >
                                        <TbTruckDelivery />
                                        In its way
                                    </span>
                                )}
                                {/* <Link
                                    className={styles.payment}
                                    to={`/account/orders/${order.id}`}
                                >
                                    <AiOutlineInfoCircle />
                                    See more
                                </Link> */}
                            </div>
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};
