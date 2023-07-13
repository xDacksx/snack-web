import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { AuthLoginForm, AuthStatusType } from "../interfaces/auth.interface";
import {
    APIResSessionLogin,
    APIResSignIn,
} from "../interfaces/axios.interface";

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

    const SignIn = async (Form: AuthLoginForm): Promise<void> => {
        try {
            const { data }: APIResSignIn = await axios.post(
                `${api}/auth/sign-in`,
                Form
            );

            console.log(data);
            if (!data.data) return;

            setAuthStatus({ user: data.data.user });
            localStorage.setItem("authorization", data.data.token);

            // if (data.errors.length === 0) {
            //     setAuthStatus({ user: data.data.token });
            //     if (token) localStorage.setItem("authorization", data.token);
            //     sessionStorage.setItem("authorization", data.token);

            //     setAppLoading(true);

            //     setTimeout(() => {
            //         setAppLoading(false);
            //     }, 300);
            // }
        } catch (error) {
            console.log(error);
        }
    };

    return { AuthStatus, AppLoading, Auth, SignIn };
};
