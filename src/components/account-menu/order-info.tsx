import { FC, ReactElement, useEffect, useState } from "react";
import { Component } from "../../interfaces/react_element";
import axios from "axios";
import { useWebToken } from "../../hooks/useWebToken";
import { apiAddress } from "../../context";
import { Navigate, useParams } from "react-router-dom";
import styles from "../../scss/components/account/orders.module.scss";

export const OrderInfo: FC<Component> = ({}): ReactElement => {
    const [order, setOrder] = useState<any>(undefined);
    const { getHeader } = useWebToken();

    const { id } = useParams();

    async function getOrder() {
        try {
            const { data } = await axios.get(
                `${apiAddress}/user/orders/${id}`,
                {
                    headers: { Authorization: getHeader() },
                }
            );

            setOrder(data);
        } catch (error) {}
    }

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            {order === null ? (
                <Navigate to="/account/orders" />
            ) : (
                <div className={styles.infoItem}>{JSON.stringify(order)}</div>
            )}
        </>
    );
};
