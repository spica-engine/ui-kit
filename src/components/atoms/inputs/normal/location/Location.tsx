import React, { FC, memo, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import styles from "./Location.module.scss";
import "leaflet/dist/leaflet.css";
import FlexElement from "components/atoms/flex-element/FlexElement";
import FluidContainer from "components/atoms/fluid-container/FluidContainer";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import InputHeader from "components/atoms/input-header/InputHeader";
import Map from "components/atoms/map/Map";

type LocationProps = {
  coordinates?: [number, number];
  title?: string;
  onChange?: (coordinates: [number, number]) => void;
};

const Location: FC<LocationProps> = ({ coordinates, title, onChange }) => {
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

      <Map
        coordinates={coordinates}
        markerIcon={{
          icon: <Icon name="mapMarker" size="lg" className={styles.mapMarker} />,
        }}
        onChange={onChange}
      />
    </FlexElement>
  );
};

export default Location;
