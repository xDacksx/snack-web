import { FC, ReactElement } from "react";
import { Component } from "../interfaces/react_element";
import { Wall } from "../components/auth/wall-auth";

export const AdminPage: FC<Component> = ({}): ReactElement => {
    return (
        <Wall mode="admin">
            <h2>Admin</h2>
        </Wall>
    );
};
