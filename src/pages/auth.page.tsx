import {
    FC,
    FormEvent,
    ReactElement,
    useState,
    Fragment,
    useEffect,
} from "react";
import { Component } from "../interfaces/react_element";
import styles from "../scss/pages/auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import background from "../assets/auth_background.jpg";
import { Select, SelectOption } from "../components/dropdown/dropdown";
import { ResSignUp } from "../interfaces/auth.interface";
import { GoogleAuth } from "../components/auth/google-auth";

export const AuthPage: FC<Component> = ({}): ReactElement => {
    const mode = window.location.pathname.split("/auth/")[1];
    const { SignIn, SignUp, AuthStatus } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        AuthStatus.user && navigate("/");
    }, [AuthStatus]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");

    const [response, setResponse] = useState<ResSignUp>({
        data: null,
        errors: [],
        message: "",
    });

    const options = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const [dropdown, setDropdown] = useState<SelectOption | undefined>(
        options[0]
    );

    async function Login() {
        const data = await SignIn({ email, password });
        setResponse({
            data: data.data?.user ?? null,
            errors: data.errors,
            message: data.message,
        });
    }

    async function Register() {
        const data = await SignUp({
            email,
            password,
            name,
            lastname,
            gender,
        });

        setResponse(data);
    }

    async function Submit(e: FormEvent) {
        e.preventDefault();
        setResponse({
            data: null,
            errors: [],
            message: "",
        });
        mode === "sign-up" ? Register() : Login();
    }

    return (
        <div className={styles.authPage} onSubmit={Submit}>
            {!AuthStatus.user ? (
                <div className={styles.container}>
                    <form>
                        <h2>{mode === "sign-up" ? "Sign up" : "Sign in"}</h2>

                        {window.location.origin.includes(
                            "http://localhost"
                        ) && <GoogleAuth mode={mode} />}

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {mode === "sign-up" && (
                            <Fragment>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Lastname"
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
                                />

                                <Select
                                    options={options}
                                    value={dropdown}
                                    onChange={(o) => {
                                        setDropdown(o);
                                        if (o && o.value) {
                                            setGender(
                                                o.value as "female" | "male"
                                            );
                                        }
                                    }}
                                />
                            </Fragment>
                        )}

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
                        {response.message.length > 0 && (
                            <div
                                className={
                                    styles.box +
                                    (response.errors.length > 0
                                        ? ` ${styles.red}`
                                        : ` ${styles.green}`)
                                }
                            >
                                <h4>{response.message}</h4>
                            </div>
                        )}
                    </form>
                    <img
                        className={styles.thumb}
                        src={background}
                        alt="cheese burger"
                    />
                </div>
            ) : (
                <h2>no</h2>
            )}
        </div>
    );
};
