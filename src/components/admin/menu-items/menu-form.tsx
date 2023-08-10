import { FC, ReactElement, useState } from "react";
import styles from "../../../scss/pages/admin.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate } from "react-router-dom";
import { MenuItemForm } from "../../../interfaces/menu-components.interface";
import { FieldError, useForm } from "react-hook-form";
import { useMenu } from "../../../hooks/useMenu";
import { Select, SelectOption } from "../../dropdown/dropdown";

export const MenuForm: FC = ({}): ReactElement => {
    const { addProduct } = useMenu();

    const { register, handleSubmit, reset } = useForm<MenuItemForm>();

    const [errors, setErrors] = useState<string[]>([]);

    const options = [
        { label: "Available", value: "true" },
        { label: "Unavailable", value: "false" },
    ];
    const [dropdown, setDropdown] = useState<SelectOption>(options[0]);

    const Navigate = useNavigate();

    const Submit = handleSubmit(
        async (data) => {
            setErrors([]);
            data.available = dropdown.value === "true" ? true : false;
            await addProduct(data);

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
        <form className={styles.add} onSubmit={Submit}>
            <input
                type="text"
                placeholder="Name"
                {...register("name", {
                    required: true,
                })}
            />
            <input
                placeholder="Quantity"
                type="number"
                {...register("quantity", {
                    required: true,
                })}
            />
            <input
                placeholder="Price"
                type="number"
                step={0.01}
                {...register("price", {
                    required: true,
                })}
            />
            <TextareaAutosize
                placeholder="Description"
                maxLength={170}
                {...register("description", {
                    required: true,
                })}
            />

            <input
                type="file"
                {...register("image", {
                    required: true,
                })}
            />

            <Select
                options={options}
                value={dropdown}
                onChange={(o) => {
                    if (o && o.value) setDropdown(o);
                }}
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
                <button
                    className={styles.btn}
                    type="button"
                    onClick={() => Navigate("/admin/dashboard/menu")}
                >
                    Back
                </button>
            </div>
        </form>
    );
};
