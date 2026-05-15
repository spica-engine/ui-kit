import React, { FC, memo, ReactNode, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import Icon from "../icon/Icon";
import L, { LeafletMouseEvent } from "leaflet";
import ReactDOMServer from "react-dom/server";

export type TypeCoordinates = {
  lat: number;
  lng: number;
};

export type MapClickHandlerProps = {
  onMapClick: (coords: TypeCoordinates) => void;
};

export type TypeMapProps = {
  coordinates?: TypeCoordinates;
  markerIcon?: {
    icon?: ReactNode;
    iconContainerClassName?: string;
  };
  scrollWheelZoom?: boolean;
  zoom?: number;
  className?: string;
  onChange?: (coordinates: TypeCoordinates) => void;
};

function normalizeLongitude(lng: number) {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}

const MapClickHandler = ({ onMapClick }: MapClickHandlerProps) => {
  useMapEvents({
    click: (event: LeafletMouseEvent) => {
      onMapClick(event.latlng);
    },
  });
  return null;
};

const DEFAULT_COORDINATES: TypeCoordinates = { lat: 51.505, lng: -0.09 };

function isValidCoordinates(c: unknown): c is TypeCoordinates {
  return (
    c !== null &&
    typeof c === "object" &&
    typeof (c as TypeCoordinates).lat === "number" &&
    typeof (c as TypeCoordinates).lng === "number" &&
    !isNaN((c as TypeCoordinates).lat) &&
    !isNaN((c as TypeCoordinates).lng)
  );
}

const Map: FC<TypeMapProps> = ({
  coordinates,
  markerIcon,
  scrollWheelZoom = true,
  zoom = 13,
  className,
  onChange,
}) => {
  const icon = L.divIcon({
    className: `${styles.icon} ${markerIcon?.iconContainerClassName}`,
    html: ReactDOMServer.renderToString(markerIcon?.icon || <Icon name="mapMarker" />),
  });

  const [position, setPosition] = useState<TypeCoordinates>(
    isValidCoordinates(coordinates) ? coordinates : DEFAULT_COORDINATES
  );

  const handleMapClick = (latlng: TypeCoordinates) => {
    setPosition(latlng);
    const lat = latlng.lat;
    const lng = normalizeLongitude(latlng.lng);
    onChange?.({ lat, lng });
  };
  return (
    <MapContainer
      center={position!}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className={`${styles.map} ${className}`}
      worldCopyJump={true}
      maxBoundsViscosity={1.0}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className={styles.tileLayer}
      />
      <Marker position={position} icon={icon}></Marker>
      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
};

export default memo(Map);
