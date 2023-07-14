import { HTMLAttributes } from "react";

export type ReactElement = HTMLAttributes<HTMLDivElement>;

export interface Component {
    className?: string;
    children?: JSX.Element | JSX.Element[] | string | string[];
}
