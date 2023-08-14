import { FC, ReactElement, useState } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/account/changePass.module.scss";
import axios from "axios";
import { useWebToken } from "../../hooks/useWebToken";
import { FieldError, useForm } from "react-hook-form";
import { apiAddress } from "../../context";

export const AccountChangePassword: FC<Component> = ({}): ReactElement => {
    const [errors, setErrors] = useState<string[]>([]);
    const [success, setSuccess] = useState<string[]>([]);

    const { register, handleSubmit, reset } = useForm<{
        password: string;
        newPassword: string;
        newPassword2: string;
    }>();

    const { getHeader } = useWebToken();

    const Submit = handleSubmit(
        async (data) => {
            setErrors([]);
            const Form = new FormData();
            Form.append("password", data.password);
            Form.append("newPassword", data.newPassword);
            const { data: res } = await axios.patch(
                `${apiAddress}/user/change-password`,
                Form,
                {
                    headers: { Authorization: getHeader() },
                }
            );
            if (!res.data) {
                setErrors([res.message]);
                reset({ password: "" });
            } else {
                setSuccess([res.message]);
                reset();
            }
        },
        (e) => {
            const errs: FieldError[] = [];

            for (const err in e) {
                //@ts-ignore
                const element = e[err];
                errs.push(element);
            }

            const errorsState: string[] = [];

            errs.forEach((err) => {
                if (err.type === "required" && err.ref) {
                    if (err.ref.name === "newPassword")
                        err.ref.name = "New password";
                    if (err.ref.name === "newPassword2")
                        err.ref.name = "Confirm password";

                    errorsState.push(`${err.ref.name} field is required!`);
                }
            });

            setErrors(errorsState);
        }
    );

    return (
        <form onSubmit={Submit} className={styles.changePass}>
            <input
                type="text"
                placeholder="Current password"
                {...register("password", {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="New password"
                {...register("newPassword", {
                    required: true,
                })}
            />
            <input
                type="text"
                placeholder="Confirm password"
                {...register("newPassword2", {
                    required: true,
                })}
            />
            <button className={styles.btn} type="submit">
                Save
            </button>

            <div className={styles.float}>
                {errors.length > 0 && (
                    <ul className={`${styles.message} ${styles.red}`}>
                        {errors.map((message) => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                )}
                {success.length > 0 && (
                    <ul className={`${styles.message} ${styles.green}`}>
                        {success.map((message) => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                )}
            </div>
        </form>
    );
};
