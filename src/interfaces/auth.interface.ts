/**
 * @interface Status of auth information
 */
export interface AuthStatus {
    user: null | UserAuthInfo;
}
/**
 * @type Type for useContext and createContext react hooks
 */
export type AuthStatusType = {
    AuthStatus: AuthStatus;
    setAuthStatus: (value: AuthStatus) => void;
    AppLoading: boolean;
    setAppLoading: (value: boolean) => void;
};

export interface UserAuthInfo {
    email: string;
    password: string;

    name: string;
    lastname: string;

    roleId: number;
    genderId: number;

    createdAt: Date;
    updatedAt: Date | null;
}

export interface AuthLoginForm {
    email: string;
    password: string;
}
