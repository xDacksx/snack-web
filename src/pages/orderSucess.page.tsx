import { FC, ReactElement, useEffect } from "react";
import { Component } from "../interfaces/react_element";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { apiAddress } from "../context";
import { useWebToken } from "../hooks/useWebToken";

export const OrderPage: FC<Component> = ({}): ReactElement => {
    const { secret, id } = useParams();
    const { getHeader } = useWebToken();
    const Navigate = useNavigate();

    async function main() {
        const { data } = await axios.patch(
            `${apiAddress}/user/orders/success?secret=${secret}&id=${id}`,
            undefined,
            {
                headers: {
                    Authorization: getHeader(),
                },
            }
        );

        if (data === null) Navigate("/account/cart");
        else Navigate("/account/orders");
    }

    useEffect(() => {
        main();
    }, []);

    return <></>;
};
