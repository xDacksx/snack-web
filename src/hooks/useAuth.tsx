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
    APIResGetAllGenders,
    APIResGetAllRoles,
    APIResGetGender,
    APIResGetRole,
    APIResGoogleAuth,
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
            else
                setAuthStatus({
                    user: {
                        email: user.email,
                        name: user.name,
                        lastname: user.lastname,
                        password: user.password,
                        roleId: user.roleId,
                        genderId: user.genderId,
                        createdAt: new Date(user.createdAt),
                        updatedAt: user.updatedAt
                            ? new Date(user.updatedAt)
                            : null,
                    },
                });
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
                setAuthStatus({
                    user: {
                        email: data.data.user.email,
                        name: data.data.user.name,
                        lastname: data.data.user.lastname,
                        password: data.data.user.password,
                        roleId: data.data.user.roleId,
                        genderId: data.data.user.genderId,
                        createdAt: new Date(data.data.user.createdAt),
                        updatedAt: data.data.user.updatedAt
                            ? new Date(data.data.user.updatedAt)
                            : null,
                    },
                });
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

    const GoogleAuth = async (): Promise<ResSignIn> => {
        try {
            const url = window.location.origin;

            if (!url.includes("http://localhost"))
                return {
                    data: null,
                    errors: [],
                    message: "You shouldn't be able to see this",
                };

            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);

            if (!res) throw new Error("Something went wrong!");

            let fullname: string[] = [];
            let name: string = "";
            let lastname: string = "";
            if (res.user.displayName) {
                fullname = res.user.displayName.split(" ");
                name = fullname[0] ?? "John";
                lastname = fullname[1] ?? "Doe";
            }
            const Form = {
                email: res.user.email ?? "",
                password: res.user.uid,
                name,
                lastname,
            };

            const { data }: APIResGoogleAuth = await axios.post(
                `${api}/auth/google-auth`,
                Form
            );

            if (data.data) {
                return await SignIn({
                    email: Form.email,
                    password: Form.password,
                });
            } else {
                throw new Error("Something went wrong!");
            }
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

    const GetRole = async (id: number) => {
        try {
            const { data }: APIResGetRole = await axios.get(
                `${api}/role/${id}`
            );
            return data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const GetGender = async (id: number) => {
        try {
            const { data }: APIResGetGender = await axios.get(
                `${api}/gender/${id}`
            );
            return data.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const GetAllRoles = async () => {
        try {
            const { data }: APIResGetAllRoles = await axios.get(`${api}/role/`);
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const GetAllGenders = async () => {
        try {
            const { data }: APIResGetAllGenders = await axios.get(
                `${api}/gender/`
            );
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    return {
        AuthStatus,
        AppLoading,
        Auth,
        SignIn,
        SignUp,
        GoogleAuth,
        LogOut,
        GetRole,
        GetGender,
        GetAllRoles,
        GetAllGenders,
    };
};
