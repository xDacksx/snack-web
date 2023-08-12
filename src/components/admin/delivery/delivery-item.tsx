import { FC, ReactElement } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDelivery } from "../../../hooks/useDelivery";

export const DeliveryItem: FC<DeliveryItem> = ({
    name,
    email,
}): ReactElement => {
    const { deleteUser } = useDelivery();

    return (
        <li>
            <p>
                {name} - {email}
            </p>
            <button onClick={() => deleteUser(email)}>
                <BsFillTrashFill />
            </button>
        </li>
    );
};

interface DeliveryItem {
    name: string;
    email: string;
}
