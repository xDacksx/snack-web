import axios from "axios";
import { useContext } from "react";
import {
    ContactContext,
    ContactInformation,
    ContactType,
} from "../context/contact.context";
import { useWebToken } from "./useWebToken";

const env = import.meta.env;
const api = env.VITE_SERVER_URL;

export const useContact = () => {
    const { Contact, setContact } = useContext(ContactContext) as ContactType;

    const { getHeader } = useWebToken();

    async function refreshInformation() {
        try {
            const { data } = await axios.get(`${api}/information`);

            setContact(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function editInformation(Form: ContactInformation) {
        try {
            const { data } = await axios.patch(`${api}/information`, Form, {
                headers: { Authorization: getHeader() },
            });

            await refreshInformation();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return { Contact, refreshInformation, editInformation };
};
