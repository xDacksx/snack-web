import { FC, ReactElement, useState, FormEvent } from "react";
import styles from "../../../scss/pages/admin.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { MenuFormAttributes } from "../../../interfaces/menu-components.interface";

export const MenuForm: FC<MenuFormAttributes> = ({
    setItems,
    Items,
    setAddMode,
}): ReactElement => {
    const [errors, setErrors] = useState<string[]>([]);
    const [itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");

    async function AddItem(e: FormEvent) {
        e.preventDefault();

        setErrors([]);
        const errs: string[] = [];

        if (!itemName.trim()) errs.push("Name can not be empty!");
        if (!itemDesc.trim()) errs.push("Description can not be empty!");

        if (errs.length > 0) return setErrors(errs);

        const item = {
            id: Items.length + 1,
            name: itemName,
            description: itemDesc,
            available: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newItems = [...Items, item];

        newItems.sort((a, b) => a.id - b.id);

        localStorage.setItem("menu-items", JSON.stringify(newItems));

        setItems(newItems);

        setItemName("");
        setItemDesc("");
        setAddMode(false);
    }

    return (
        <form className={styles.add} onSubmit={AddItem}>
            <input
                type="text"
                placeholder="name"
                value={itemName}
                onChange={(e) => setItemName(e.currentTarget.value)}
            />
            <TextareaAutosize
                placeholder="description"
                maxLength={170}
                value={itemDesc}
                onChange={(e) => setItemDesc(e.currentTarget.value)}
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
                    onClick={() => setAddMode(false)}
                >
                    Back
                </button>
            </div>
        </form>
    );
};
