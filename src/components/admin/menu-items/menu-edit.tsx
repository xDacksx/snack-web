import { FC, ReactElement, useState } from "react";
import styles from "../../../scss/pages/admin.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { useNavigate, useParams } from "react-router-dom";
import {
    MenuEditInfoForm,
    MenuEditImgForm,
} from "../../../interfaces/menu-components.interface";
import { FieldError, useForm } from "react-hook-form";
import { useMenu } from "../../../hooks/useMenu";
import { Select, SelectOption } from "../../dropdown/dropdown";

export const MenuEdit: FC = ({}): ReactElement => {
    const { editProduct, MenuItems } = useMenu();

    const { register, handleSubmit, reset } = useForm<MenuEditInfoForm>();

    const { register: registerImg, handleSubmit: handleSubmitImg } =
        useForm<MenuEditImgForm>();

    const [errors, setErrors] = useState<string[]>([]);

    const options = [
        { label: "Available", value: "true" },
        { label: "Unavailable", value: "false" },
    ];
    const { itemId } = useParams();

    const currentItem = itemId
        ? MenuItems.filter((item) => item.id === parseInt(itemId))[0]
        : null;

    const [dropdown, setDropdown] = useState<SelectOption>(
        currentItem
            ? currentItem.available
                ? options[0]
                : options[1]
            : options[0]
    );

    const Navigate = useNavigate();

    const SubmitInfo = handleSubmit(
        async (data) => {
            setErrors([]);
            if (itemId) {
                data.available = dropdown.value === "true" ? true : false;

                await editProduct(data, parseInt(itemId));

                reset();
                Navigate("/admin/dashboard/menu");
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
                if (err.type === "required" && err.ref)
                    errorsState.push(`${err.ref.name} field is required!`);
            });

            setErrors(errorsState);
        }
    );

    const SubmitImg = handleSubmitImg(
        async (data) => {
            setErrors([]);
            if (itemId) {
                await editProduct(data, parseInt(itemId));

                reset();
                Navigate("/admin/dashboard/menu");
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
                if (err.type === "required" && err.ref)
                    errorsState.push(`${err.ref.name} field is required!`);
            });

            setErrors(errorsState);
        }
    );

    return (
        <div className={styles.edit}>
            <form className={styles.form} onSubmit={SubmitInfo}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", {
                        required: true,
                        value: currentItem ? currentItem.name : undefined,
                    })}
                />
                <input
                    placeholder="Quantity"
                    type="number"
                    {...register("quantity", {
                        required: true,
                        value: currentItem ? currentItem.quantity : undefined,
                    })}
                />
                <input
                    placeholder="Price"
                    type="number"
                    step={0.01}
                    {...register("price", {
                        required: true,
                        value: currentItem ? currentItem.price : undefined,
                    })}
                />
                <TextareaAutosize
                    placeholder="Description"
                    maxLength={170}
                    {...register("description", {
                        required: true,
                        value: currentItem
                            ? currentItem.description
                            : undefined,
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
                    Save information
                </button>
            </form>
            <form className={styles.img} onSubmit={SubmitImg}>
                <input
                    type="file"
                    {...registerImg("image", {
                        required: true,
                    })}
                    accept="image/*"
                />
                <div className={styles.btn_line}>
                    <button className={styles.btn} type="submit">
                        Save image
                    </button>
                    <button
                        className={styles.btn}
                        type="button"
                        onClick={() => window.open(currentItem?.imageUrl)}
                    >
                        Open Image
                    </button>
                </div>
            </form>

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
        </div>
    );
};
