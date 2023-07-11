import { FC, createContext, useState } from "react";
import { AuthStatusType, AuthStatus } from "../interfaces/auth.interface";
import { ReactElement } from "../interfaces/react_element";

/** Context for auth status */
export const AuthContext = createContext<AuthStatusType | null>(null);

/** Provides a React element for any element that uses authentication information. */
export const AuthProvider: FC<ReactElement> = ({ children }): JSX.Element => {
    /**Default value of authentication status */
    const Default: AuthStatus = {
        user: null,
    };

    const [AuthStatus, setAuthStatus] = useState<AuthStatus>(Default);
    const [AppLoading, setAppLoading] = useState<boolean>(true);

    return (
        <AuthContext.Provider
            value={{ AuthStatus, setAuthStatus, AppLoading, setAppLoading }}
            children={children}
        />
    );
};
