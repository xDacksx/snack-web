import { AxiosResponse } from "axios";
import { UserAuthInfo, firebaseConfig } from "./auth.interface";

export interface APIRes<T> extends AxiosResponse {
    data: {
        data: T;
        message: string;
        errors: Array<string>;
    };
}

export type APIResSessionLogin = APIRes<UserAuthInfo>;

export type APIResSignIn = APIRes<{
    user: UserAuthInfo;
    token: string;
}>;

export type APIResSignUp = APIRes<UserAuthInfo>;

export type APIResGoogleSignIn = APIRes<firebaseConfig>;
