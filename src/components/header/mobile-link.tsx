import { FC, ReactElement, MouseEventHandler, useContext } from "react";
import { Component } from "../../interfaces/react_element";
import style from "../../scss/components/header.module.scss";
import { useNavigate } from "react-router-dom";
import { NavContext, NavStatusType } from "../../context/nav.context";

export const MobileLink: FC<MobileLink> = ({
    children,
    onClick,
    to,
}): ReactElement => {
    const navigate = useNavigate();
    const { setNavStatus } = useContext(NavContext) as NavStatusType;

    const Click: MouseEventHandler = () => {
        onClick && onClick();
        setNavStatus(false);
        navigate(to);
    };

    return (
        <button onClick={Click} className={style.link}>
            {children}
        </button>
    );
};

interface MobileLink extends Component {
    onClick?: () => void;
    to: string;
}
