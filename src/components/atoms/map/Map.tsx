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

type MapProps = {
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

const MapClickHandler = ({ onMapClick }: MapClickHandlerProps) => {
  useMapEvents({
    click: (event: LeafletMouseEvent) => {
      onMapClick(event.latlng);
    },
  });
  return null;
};

const Map: FC<MapProps> = ({
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

  const [position, setPosition] = useState(coordinates! || { lat: 51.505, lng: -0.09 });

  const handleMapClick = (latlng: TypeCoordinates) => {
    setPosition(latlng);
    onChange?.(latlng);
  };
  return (
    <MapContainer
      center={position!}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className={`${styles.map} ${className}`}
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
