import { FC, FormEvent, ReactElement } from "react";
import { Component } from "../interfaces/react_element";
import styles from "../scss/pages/auth.module.scss";
import GoogleIcon from "../assets/google_favicon.ico";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import background from "../assets/auth_background.jpg";

export const AuthPage: FC<Component> = ({}): ReactElement => {
    const mode = window.location.pathname.split("/auth/")[1];

    const { SignIn } = useAuth();

    async function Login() {
        await SignIn({ email: "diegozar02@gmail.com", password: "admin" });
    }

    async function Submit(e: FormEvent) {
        e.preventDefault();
        mode === "sign-up" ? "Sign up" : Login();
    }

    return (
        <div className={styles.authPage} onSubmit={Submit}>
            <div className={styles.container}>
                <form>
                    <h2>{mode === "sign-up" ? "Sign up" : "Sign in"}</h2>

                    <div className={styles.otherAuth}>
                        <button className={styles.btn}>
                            <img src={GoogleIcon} alt="Google icon" />{" "}
                            {mode === "sign-up" ? "Sign up" : "Sign in"} with
                            Google
                        </button>
                    </div>

                    <p className={styles.line}>or</p>

                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />

                    <button className={styles.btn} type="submit">
                        {mode === "sign-up" ? "Sign up" : "Sign in"}
                    </button>

                    <p className={styles.instead}>
                        {mode === "sign-up"
                            ? "Already have an account?"
                            : "Don't have an account?"}
                        {mode === "sign-up" ? (
                            <Link to="/auth/sign-in">Sign in instead.</Link>
                        ) : (
                            <Link to="/auth/sign-up">Sign up instead.</Link>
                        )}
                    </p>
                </form>
                <img
                    className={styles.thumb}
                    src={background}
                    alt="cheese burger"
                />
            </div>
        </div>
    );
};
