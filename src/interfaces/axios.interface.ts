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

export type APIResGoogleAuth = APIRes<{
    mode: "sign-in" | "sign-up";
    data:
        | UserAuthInfo
        | {
              user: UserAuthInfo;
              token: string;
          };
} | null>;

export type APIResSignUp = APIRes<UserAuthInfo>;

export type APIResGoogleSignIn = APIRes<firebaseConfig>;

interface Role {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
type Gender = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type APIResGetRole = APIRes<Role>;
export type APIResGetGender = APIRes<Gender>;

export type APIResGetAllRoles = AxiosResponse<Role[]>;
export type APIResGetAllGenders = AxiosResponse<Gender[]>;
