import { FC, Fragment, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Wall: FC<WallAttributes> = ({ children, mode }): ReactElement => {
    const child = <Fragment children={children} />;
    const { AuthStatus } = useAuth();

    if (mode === "need-auth") {
        if (AuthStatus.user) return child;
        else return <Navigate to="/auth/sign-in" />;
    }
    if (mode === "no-auth-exclusive") {
        if (AuthStatus.user) return <Navigate to="/auth/sign-in" />;
        else return child;
    }
    return child;
};

type ComponentChildren = JSX.Element | JSX.Element[] | string | string[];

interface WallAttributes {
    children: ComponentChildren;
    mode?: "need-auth" | "no-auth-exclusive";
}
