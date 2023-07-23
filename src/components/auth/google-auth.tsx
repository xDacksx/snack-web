import { FC, ReactElement } from "react";
import GoogleIcon from "../../assets/google_favicon.ico";
import styles from "../../scss/pages/auth.module.scss";
import { useAuth } from "../../hooks/useAuth";

export const GoogleAuth: FC = (): ReactElement => {
    const { GoogleAuth: Auth } = useAuth();

    return (
        <>
            <div className={styles.otherAuth}>
                <button type="button" className={styles.btn} onClick={Auth}>
                    <img src={GoogleIcon} alt="Google icon" /> Continue with
                    Google
                </button>
            </div>

            <p className={styles.line}>or</p>
        </>
    );
};
