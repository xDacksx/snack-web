import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import {
    AuthLoginForm,
    AuthRegisterForm,
    AuthStatusType,
    ResSignIn,
    ResSignUp,
} from "../interfaces/auth.interface";
import {
    APIResSessionLogin,
    APIResSignIn,
    APIResSignUp,
} from "../interfaces/axios.interface";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/config";

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

    const SignIn = async (Form: AuthLoginForm): Promise<ResSignIn> => {
        try {
            const { data }: APIResSignIn = await axios.post(
                `${api}/auth/sign-in`,
                Form
            );

            if (data.data) {
                setAuthStatus({ user: data.data.user });
                localStorage.setItem("authorization", data.data.token);
            }
            return {
                data: data.data,
                errors: data.errors,
                message: data.message,
            };
        } catch (error) {
            let msg = "";
            if (error instanceof Error) msg = error.message;
            return {
                data: null,
                errors: [msg],
                message: msg,
            };
        }
    };

    const SignUp = async (Form: AuthRegisterForm): Promise<ResSignUp> => {
        try {
            const { data }: APIResSignUp = await axios.post(
                `${api}/auth/sign-up`,
                Form
            );

            return {
                data: data.data,
                errors: data.errors,
                message: data.message,
            };
        } catch (error) {
            let msg = "";
            if (error instanceof Error) msg = error.message;
            return {
                data: null,
                errors: [msg],
                message: msg,
            };
        }
    };

    const GoogleSignUp = async (): Promise<ResSignUp | void> => {
        try {
            const url = window.location.origin;

            if (!url.includes("http://localhost")) return;

            const provider = new GoogleAuthProvider();
            const data = await signInWithPopup(auth, provider);

            if (!data) throw new Error("Something went wrong!");

            let fullname: string[] = [];
            let name: string = "";
            let lastname: string = "";
            if (data.user.displayName) {
                fullname = data.user.displayName.split(" ");
                name = fullname[0] ?? "John";
                lastname = fullname[1] ?? "Doe";
            }
            const user = {
                email: data.user.email ?? "",
                password: data.user.uid,
                name,
                lastname,
            };

            const res = await SignUp({ ...user, gender: "male" });

            return {
                data: res.data,
                errors: res.errors,
                message: res.message,
            };
        } catch (error) {
            let msg = "";
            if (error instanceof Error) msg = error.message;
            return {
                data: null,
                errors: [msg],
                message: msg,
            };
        }
    };

    const LogOut = (): void => {
        setAuthStatus({ user: null });
        localStorage.removeItem("authorization");
    };

    return {
        AuthStatus,
        AppLoading,
        Auth,
        SignIn,
        SignUp,
        GoogleSignUp,
        LogOut,
    };
};
