import { FC, Fragment, ReactElement } from "react";
import { Component } from "../../interfaces/react_element";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export const Map: FC<Component> = ({}): ReactElement => {
    const env = import.meta.env;

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: env.VITE_MAPS_API_KEY,
    });

    const location: google.maps.LatLngLiteral = {
        lat: 17.99733,
        lng: -92.938835,
    };

    return (
        <Fragment>
            {isLoaded && <GoogleMap center={location} zoom={18} />}
        </Fragment>
    );
};
