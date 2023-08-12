import { FC, ReactElement, useEffect, useState } from "react";
import { Component } from "../../../interfaces/react_element";
import style from "../../../scss/components/admin/delivery.module.scss";
import { DeliveryItem } from "./delivery-item";
import { useDelivery } from "../../../hooks/useDelivery";
import { FieldError, useForm } from "react-hook-form";

export const DeliveryList: FC<Component> = ({}): ReactElement => {
    const { DeliveryUsers, getUsers, addUser } = useDelivery();
    const [errors, setErrors] = useState<string[]>([]);

    const { register, reset, handleSubmit } = useForm<{ email: string }>();

    useEffect(() => {
        getUsers();
    }, []);

    const Submit = handleSubmit(
        async (data) => {
            setErrors([]);

            const emails = DeliveryUsers.map((user) => user.email);

            if (emails.includes(data.email))
                return setErrors(["This email is already a deliverer"]);

            const res = await addUser(data.email);

            if (res.errors && res.errors.length > 0)
                return setErrors([res.errors[0].msg]);

            if (res.message === "This user does not exist")
                return setErrors(["This email does not have an account"]);
            setErrors([]);
            reset();
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
                if (err.type === "required" && err.ref)
                    errorsState.push(`${err.ref.name} field is required!`);
            });

            setErrors(errorsState);
        }
    );

    return (
        <div className={style.delivery}>
            <form className={style.form} onSubmit={Submit}>
                <input
                    type="text"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                <button className={style.btn} type="submit">
                    Add
                </button>
                {errors.length === 1 && (
                    <p className={`${style.message} ${style.red}`}>
                        {errors[0]}
                    </p>
                )}
            </form>
            <div className={style.list}>
                <ul>
                    {DeliveryUsers.map((user) => (
                        <DeliveryItem
                            key={user.email}
                            name={`${user.name} ${user.lastname}`}
                            email={user.email}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
};
