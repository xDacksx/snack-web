import { FC, createContext, useState } from "react";
import { ReactElement } from "../interfaces/react_element";

export const NavContext = createContext<NavStatusType | null>(null);

export const NavProvider: FC<ReactElement> = ({ children }): JSX.Element => {
    const [NavStatus, setNavStatus] = useState<boolean>(false);

    return (
        <NavContext.Provider
            value={{ NavStatus, setNavStatus }}
            children={children}
        />
    );
};

export type NavStatusType = {
    NavStatus: boolean;
    setNavStatus: (value: boolean) => void;
};
