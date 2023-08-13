import { FC, ReactElement, useState } from "react";
import { Component } from "../../../interfaces/react_element";
import style from "../../../scss/components/admin/information.module.scss";
import { FieldError, useForm } from "react-hook-form";
import { useContact } from "../../../hooks/useContact";
import { ContactInformation } from "../../../context/contact.context";

function isValidUrl(string: string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

export const PlaceInformation: FC<Component> = ({}): ReactElement => {
    const [errors, setErrors] = useState<string[]>([]);
    const { Contact, editInformation } = useContact();
    const { handleSubmit, register } = useForm<ContactInformation>();
    const [success, setSuccess] = useState("");

    const Submit = handleSubmit(
        async (data) => {
            setErrors([]);
            const errs: string[] = [];
            if (!isValidUrl(data.whatsapp))
                errs.push("Whatsapp field value must be a URL");
            if (!isValidUrl(data.facebook))
                errs.push("Facebook field value must be a URL");
            if (!isValidUrl(data.instagram))
                errs.push("Instagram field value must be a URL");
            if (!isValidUrl(data.x)) errs.push("X field value must be a URL");

            const x: number = data.latX;
            const y: number = data.latY;

            if (isNaN(x)) errs.push("Lat X value must be a number");
            if (isNaN(y)) errs.push("Lat Y value must be a number");

            if (errs.length > 0) return setErrors(errs);

            const res = await editInformation(data);

            if (res.errors.length > 0) return setErrors([res.errors[0].msg]);

            setSuccess(res.message);
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
        <form className={style.infomationPage} onSubmit={Submit}>
            <input
                type="text"
                placeholder="Whatsapp"
                {...register("whatsapp", {
                    required: true,
                    value: Contact.whatsapp,
                })}
            />
            <input
                type="text"
                placeholder="Facebook"
                {...register("facebook", {
                    required: true,
                    value: Contact.facebook,
                })}
            />
            <input
                type="text"
                placeholder="X"
                {...register("x", { required: true, value: Contact.x })}
            />
            <input
                type="text"
                placeholder="Instagram"
                {...register("instagram", {
                    required: true,
                    value: Contact.instagram,
                })}
            />
            <label htmlFor="x">Cordinates</label>
            <div className={style.coords}>
                <input
                    type="number"
                    placeholder="X"
                    id="x"
                    {...register("latX", {
                        required: true,
                        valueAsNumber: true,
                        value: Contact.latX,
                    })}
                    step={0.000001}
                />
                <input
                    type="number"
                    placeholder="Y"
                    {...register("latY", {
                        required: true,
                        valueAsNumber: true,
                        value: Contact.latY,
                    })}
                    step={0.000001}
                />
            </div>

            <div className={style.float}>
                {errors.length > 0 && (
                    <ul className={`${style.message} ${style.red}`}>
                        {errors.map((message) => (
                            <li key={message}>{message}</li>
                        ))}
                    </ul>
                )}
                {success.length > 0 && (
                    <ul className={`${style.message} ${style.green}`}>
                        <li>{success}</li>
                    </ul>
                )}

                <button className={style.btn} type="submit">
                    Save
                </button>
            </div>
        </form>
    );
};
