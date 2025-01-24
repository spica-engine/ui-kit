import React, { FC, memo, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Location.module.scss";
import "leaflet/dist/leaflet.css";
import FlexElement from "components/atoms/flex-element/FlexElement";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import InputHeader from "components/atoms/input-header/InputHeader";

type LocationProps = {
  coordinates: [number, number];
  title: string;
};

const Location: FC<LocationProps> = ({ coordinates, title }) => {
  return (
    <FlexElement
      className={styles.location}
      dimensionX={500}
      dimensionY={500}
      gap={10}
      direction="vertical"
      alignment="leftCenter"
    >
      <InputHeader
        prefix={{ children: <Icon name="mapMarker" className={styles.icon} /> }}
        root={{ children: <Text variant="secondary">{title}</Text> }}
      />

      <MapContainer
        center={coordinates || [51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {coordinates && <Marker position={coordinates}></Marker>}
      </MapContainer>
    </FlexElement>
  );
};

export default Location;
