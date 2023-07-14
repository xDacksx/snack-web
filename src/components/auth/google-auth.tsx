import { FC, ReactElement } from "react";
import GoogleIcon from "../../assets/google_favicon.ico";
import styles from "../../scss/pages/auth.module.scss";
import { useAuth } from "../../hooks/useAuth";

export const GoogleAuth: FC<GoogleAuth> = ({ mode }): ReactElement => {
    const { GoogleSignUp } = useAuth();

    return (
        <>
            <div className={styles.otherAuth}>
                <button
                    type="button"
                    className={styles.btn}
                    onClick={mode === "sign-up" ? GoogleSignUp : () => {}}
                >
                    <img src={GoogleIcon} alt="Google icon" />{" "}
                    {mode === "sign-up" ? "Sign up" : "Sign in"} with Google
                </button>
            </div>

            <p className={styles.line}>or</p>
        </>
    );
};

interface GoogleAuth {
    mode: string;
}
