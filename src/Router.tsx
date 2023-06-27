import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "*",
                element: <h2>Error 404</h2>,
            },
        ],
    },
]);
