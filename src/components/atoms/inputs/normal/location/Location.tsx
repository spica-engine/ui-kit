import React, { FC, memo } from "react";
import styles from "./Location.module.scss";
import "../../../../../../node_modules/leaflet/dist/leaflet.css";
import FlexElement, { TypeFlexElement } from "@atoms/flex-element/FlexElement";
import Icon from "@atoms/icon/Icon";
import Text from "@atoms/text/Text";
import InputHeader from "@atoms/input-header/InputHeader";
import Map, { TypeCoordinates } from "@atoms/map/Map";

export type TypeLocationInput = {
  coordinates?: TypeCoordinates;
  title?: string;
  onChange?: (coordinates: TypeCoordinates) => void;
  description?: string;
};

const LocationInput: FC<TypeLocationInput & TypeFlexElement> = ({
  coordinates,
  title,
  onChange,
  description,
  ...props
}) => {
  return (
    <FlexElement
      dimensionX={500}
      dimensionY={500}
      gap={10}
      direction="vertical"
      alignment="leftCenter"
      {...props}
      className={`${props.className} ${styles.location}`}
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
      <Text size="xsmall" className={`${styles.description}`}>
        {description}
      </Text>
    </FlexElement>
  );
};

export default memo(LocationInput);
