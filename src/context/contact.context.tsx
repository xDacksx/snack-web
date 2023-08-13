import { FC, createContext, useState, useEffect } from "react";
import { ReactElement } from "../interfaces/react_element";
import axios from "axios";

const env = import.meta.env;
const api = env.VITE_SERVER_URL;

export const ContactContext = createContext<ContactType | null>(null);

export const ContactProvider: FC<ReactElement> = ({
    children,
}): JSX.Element => {
    async function GetInfo() {
        try {
            const { data } = await axios.get(`${api}/information`);

            setContact(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        GetInfo();
    }, []);

    const [Contact, setContact] = useState<ContactInformation>({
        whatsapp: "",
        facebook: "",
        instagram: "",
        x: "",
        latX: 0,
        latY: 0,
    });

    return (
        <ContactContext.Provider
            value={{ Contact, setContact }}
            children={children}
        />
    );
};

export type ContactType = {
    Contact: ContactInformation;
    setContact: (value: ContactInformation) => void;
};

export interface ContactInformation {
    whatsapp: string;
    facebook: string;
    instagram: string;
    x: string;
    latX: number;
    latY: number;
}
