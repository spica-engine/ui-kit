import React, { FC } from "react";
import styles from "./Location.module.scss";
import "leaflet/dist/leaflet.css";
import FlexElement from "components/atoms/flex-element/FlexElement";
import Icon from "components/atoms/icon/Icon";
import Text from "components/atoms/text/Text";
import InputHeader from "components/atoms/input-header/InputHeader";
import Map, { TypeCoordinates } from "components/atoms/map/Map";

type LocationProps = {
  coordinates?: TypeCoordinates;
  title?: string;
  onChange?: (coordinates: TypeCoordinates) => void;
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
