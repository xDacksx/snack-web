import { FC, FormEvent, Fragment, ReactElement, useState } from "react";
import { Component } from "../../interfaces/react_element";
import { PiHamburgerBold } from "react-icons/pi";
import { GrFormAdd } from "react-icons/gr";
import styles from "../../scss/pages/admin.module.scss";
import TextareaAutosize from "react-textarea-autosize";

export const EditMenu: FC<Component> = ({}): ReactElement => {
    const [addMode, setAddMode] = useState(false);
    const [itemName, setItemName] = useState("");
    const [itemDesc, setItemDesc] = useState("");

    interface item {
        id: number;
        name: string;
        description: string;
        available: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    function newItem(id: number): item {
        const item: item = {
            id: id,
            name: "Item",
            description: "Lorem",
            available: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        return item;
    }

    const [Items, setItems] = useState([newItem(1), newItem(2)]);

    async function AddItem(e: FormEvent) {
        e.preventDefault();

        setItems([
            {
                id: Items.length + 1,
                name: itemName,
                description: itemDesc,
                available: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            ...Items,
        ]);

        setItemName("");
        setItemDesc("");
        setAddMode(false);
    }

    return (
        <Fragment>
            <div className={styles.edit}>
                {Items.map((item) => (
                    <button className={styles.item} type="button" key={item.id}>
                        <PiHamburgerBold /> <p>{item.name}</p>
                    </button>
                ))}
                <button
                    className={`${styles.addBtn}`}
                    type="button"
                    onClick={() => setAddMode(true)}
                >
                    <GrFormAdd />
                </button>
            </div>
            {addMode && (
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

                    <button
                        className={`${styles.btn} ${styles.float}`}
                        type="button"
                        onClick={() => setAddMode(false)}
                    >
                        Back
                    </button>
                </form>
            )}
        </Fragment>
    );
};
