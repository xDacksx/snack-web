import { FC, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import styles from "../../scss/components/contact.module.scss";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { Map } from "./map";
import { useContact } from "../../hooks/useContact";

export const ContactInfo: FC<Component> = ({}): ReactElement => {
    const { Contact } = useContact();

    return (
        <div id="information" className={styles.contactInfo}>
            <div className={styles.social}>
                <h5>Contact information</h5>
                <a href={Contact.whatsapp} target="_blank">
                    <BsWhatsapp /> Whatsapp
                </a>
                <a href={Contact.facebook} target="_blank">
                    <BsFacebook /> Facebook
                </a>
                <a href={Contact.instagram} target="_blank">
                    <BsInstagram /> Instagram
                </a>
                <a href={Contact.x} target="_blank">
                    <XIcon /> X
                </a>
            </div>
            <Map />
        </div>
    );
};

export const XIcon: FC<Component> = (): ReactElement => {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </g>
        </svg>
    );
};
