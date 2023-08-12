import { FC, createContext, useState, useEffect } from "react";
import { ReactElement } from "../interfaces/react_element";
import axios from "axios";
import { UserAuthInfo } from "../interfaces/auth.interface";

const env = import.meta.env;
const api = env.VITE_SERVER_URL;

export const DeliveryContext = createContext<DeliveryType | null>(null);

export const DeliveryProvider: FC<ReactElement> = ({
    children,
}): JSX.Element => {
    const [DeliveryUsers, setDeliveryUsers] = useState<UserAuthInfo[]>([]);

    async function getUsers() {
        try {
            const { data } = await axios.get(`${api}/user/deliverers-list`);
            setDeliveryUsers(data as UserAuthInfo[]);
        } catch (error) {}
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <DeliveryContext.Provider
            value={{ DeliveryUsers, setDeliveryUsers }}
            children={children}
        />
    );
};

export type DeliveryType = {
    DeliveryUsers: UserAuthInfo[];
    setDeliveryUsers: (value: UserAuthInfo[]) => void;
};