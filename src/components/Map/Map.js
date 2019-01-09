import React from "react";
import "./Map.scss";

import Map from "pigeon-maps";
import Overlay from "pigeon-overlay";

import markerIcon from "../../img/marker-icon.png";

const MapComponent = props => {
    if(props.lat !== 0 && props.lon !== 0) {
        return (
            <Map center={[props.lat, props.lon]} zoom={15} height={435}>
                <Overlay anchor={[props.lat, props.lon]} offset={[33, 43]}>
                    <img src={markerIcon} alt="" />
                </Overlay>
            </Map>
        )}else {
        return (
            null
        )
    }
};

export default MapComponent;