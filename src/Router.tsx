import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "./pages/home.page";
import { AuthPage } from "./pages/auth.page";
import { AccountPage } from "./pages/account.page";
import { AdminPage } from "./pages/admin.page";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "*",
                element: <h2>Error 404</h2>,
            },
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/auth/sign-up",
                element: <AuthPage />,
            },
            {
                path: "/auth/sign-in",
                element: <AuthPage />,
            },
            {
                path: "/account",
                element: <AccountPage />,
            },
            {
                path: "/admin/dashboard",
                element: <AdminPage />,
            },
        ],
    },
]);
