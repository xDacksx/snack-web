import { FC, Fragment, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useContact } from "../../hooks/useContact";

export const Map: FC<Component> = ({}): ReactElement => {
    const env = import.meta.env;

    const { Contact } = useContact();

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: env.VITE_MAPS_API_KEY,
    });

    const location: google.maps.LatLngLiteral = {
        lat: Contact.latX,
        lng: Contact.latY,
    };

    return (
        <Fragment>
            {isLoaded && <GoogleMap center={location} zoom={18} />}
        </Fragment>
    );
};
