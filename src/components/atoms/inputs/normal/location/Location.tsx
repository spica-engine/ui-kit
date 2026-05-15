import React, { FC, memo, useState, useCallback } from "react";
import styles from "./Location.module.scss";
import Map, { TypeCoordinates } from "@atoms/map/Map";

export type TypeLocationInput = {
  coordinates?: TypeCoordinates;
  title?: string;
  onChange?: (coordinates: TypeCoordinates) => void;
  className?: string;
};

const LocationInput: FC<TypeLocationInput> = ({
  coordinates,
  title = "Location Coords",
  onChange,
  className,
}) => {
  const [lat, setLat] = useState<string>(coordinates?.lat?.toString() ?? "");
  const [lng, setLng] = useState<string>(coordinates?.lng?.toString() ?? "");

  const handleLatChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLat(val);
      const num = parseFloat(val);
      if (!isNaN(num)) onChange?.({ lat: num, lng: parseFloat(lng) || 0 });
    },
    [lng, onChange]
  );

  const handleLngChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setLng(val);
      const num = parseFloat(val);
      if (!isNaN(num)) onChange?.({ lat: parseFloat(lat) || 0, lng: num });
    },
    [lat, onChange]
  );

  return (
    <div className={`${styles.field} ${className ?? ""}`}>
      <div className={styles.fieldHead}>
        <div className={styles.fieldName}>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {title}
        </div>
        <span className={styles.fieldType}>location</span>
      </div>

      <Map
        coordinates={coordinates?.lat != null && coordinates?.lng != null ? coordinates : undefined}
        onChange={onChange}
        className={styles.map}
        scrollWheelZoom={false}
      />

      <div className={styles.coordsRow}>
        <input
          className={styles.coordInput}
          placeholder="Latitude"
          value={lat}
          onChange={handleLatChange}
        />
        <input
          className={styles.coordInput}
          placeholder="Longitude"
          value={lng}
          onChange={handleLngChange}
        />
      </div>
    </div>
  );
};

export default memo(LocationInput);
