import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { AuthStatusType } from "../interfaces/auth.interface";
import { APIResSessionLogin } from "../interfaces/axios.interface";

const env = import.meta.env;
const api = env.VITE_SERVER_URL;

export const useAuth = () => {
    const { AppLoading, setAppLoading } = useContext(
        AuthContext
    ) as AuthStatusType;
    const { AuthStatus, setAuthStatus } = useContext(
        AuthContext
    ) as AuthStatusType;

    const Auth = async (): Promise<void> => {
        const authorization =
            localStorage.getItem("authorization") ||
            sessionStorage.getItem("authorization");

        if (authorization) {
            const { data }: APIResSessionLogin = await axios.get(
                `${api}/auth/verify`,
                {
                    headers: { Authorization: `Bearer ${authorization}` },
                }
            );

            const user = data.data;

            if (data.errors.length > 0) setAuthStatus({ user: null });
            else setAuthStatus({ user });
        }

        setTimeout(() => {
            setAppLoading(false);
        }, 100);
    };

    return { AuthStatus, AppLoading, Auth };
};
