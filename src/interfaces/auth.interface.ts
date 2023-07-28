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

    role: "client" | "admin" | "delivery";
    gender: string;

    createdAt: Date;
    updatedAt: Date | null;
}

export interface AuthLoginForm {
    email: string;
    password: string;
}
export interface AuthRegisterForm {
    email: string;
    password: string;

    name: string;
    lastname: string;

    gender: "male" | "female";
}

export interface ResSignIn {
    data: {
        user: UserAuthInfo;
        token: string;
    } | null;
    message: string;
    errors: Array<string>;
}

export interface ResSignUp {
    data: UserAuthInfo | null;
    message: string;
    errors: string[];
}

export interface firebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}
