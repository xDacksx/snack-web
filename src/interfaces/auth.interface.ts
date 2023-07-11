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
    name: string;
    lastname: string;
    gender: string;
    role: string;
    createdAt: Date;
}
