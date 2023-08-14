import axios from "axios";
import { useContext } from "react";
import { UserAuthInfo } from "../interfaces/auth.interface";
import { useWebToken } from "./useWebToken";
import { DeliveryContext, DeliveryType } from "../context/delivery.context";
import { apiAddress } from "../context";

export const useDelivery = () => {
    const { DeliveryUsers, setDeliveryUsers } = useContext(
        DeliveryContext
    ) as DeliveryType;

    const { getHeader } = useWebToken();

    async function getUsers() {
        try {
            const { data } = await axios.get(
                `${apiAddress}/user/deliverers-list`
            );
            setDeliveryUsers(data as UserAuthInfo[]);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteUser(email: string) {
        try {
            const Form = new FormData();
            Form.append("roleName", "client");
            Form.append("email", email);
            const { data } = await axios.patch(
                `${apiAddress}/user/change-role`,
                Form,
                { headers: { Authorization: getHeader() } }
            );

            if (data.data) await getUsers();
        } catch (error) {}
    }
    async function addUser(email: string) {
        try {
            const Form = new FormData();
            Form.append("roleName", "delivery");
            Form.append("email", email);
            const { data } = await axios.patch(
                `${apiAddress}/user/change-role`,
                Form,
                { headers: { Authorization: getHeader() } }
            );

            if (data.data) await getUsers();
            return data;
        } catch (error) {}
    }

    return { DeliveryUsers, deleteUser, getUsers, addUser };
};
