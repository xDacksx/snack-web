import { FC, ReactElement, useState, FormEvent, useContext } from "react";
import styles from "../../../scss/pages/admin.module.scss";
import TextareaAutosize from "react-textarea-autosize";
import { MenuContext, MenuItemsType } from "../../../context/menu.context";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "../../../interfaces/menu-components.interface";

export const MenuForm: FC = ({}): ReactElement => {
    const { MenuItems, setMenuItems } = useContext(
        MenuContext
    ) as MenuItemsType;

    const [errors, setErrors] = useState<string[]>([]);

    const Navigate = useNavigate();

    const { itemId } = useParams();
    const currentItem = itemId
        ? MenuItems.filter((item) => item.id === parseInt(itemId))[0]
        : null;

    const [itemName, setItemName] = useState(
        currentItem ? currentItem.name : ""
    );
    const [itemDesc, setItemDesc] = useState(
        currentItem ? currentItem.description : ""
    );

    async function Submit(e: FormEvent) {
        e.preventDefault();

        setErrors([]);
        const errs: string[] = [];

        if (!itemName.trim()) errs.push("Name can not be empty!");
        if (!itemDesc.trim()) errs.push("Description can not be empty!");

        if (errs.length > 0) return setErrors(errs);

        const item = {
            id: MenuItems.length + 1,
            name: itemName,
            description: itemDesc,
            available: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        let newItems: MenuItem[] = [];

        if (!itemId) {
            newItems = [...MenuItems, item];
        } else {
            item.id = parseInt(itemId);
            const filteredItems = MenuItems.filter(
                (item) => item.id !== parseInt(itemId)
            );
            newItems = [...filteredItems, item];
        }
        newItems.sort((a, b) => a.id - b.id);

        localStorage.setItem("menu-items", JSON.stringify(newItems));
        setMenuItems(newItems);

        Navigate("/admin/dashboard/menu");
    }

    return (
        <form className={styles.add} onSubmit={Submit}>
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
                    onClick={() => Navigate("/admin/dashboard/menu")}
                >
                    Back
                </button>
            </div>
        </form>
    );
};
