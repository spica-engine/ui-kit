import React, { FC, ReactNode, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import Icon from "../icon/Icon";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";

type MapProps = {
  coordinates?: [number, number];
  markerIcon?: {
    icon?: ReactNode;
    iconContainerClassName?: string;
  };
  scrollWheelZoom?: boolean;
  zoom?: number;
  className?: string;
  onChange?: (coordinates: [number, number]) => void;
};

const MapClickHandler = ({ onMapClick }: any) => {
  useMapEvents({
    click: (event) => {
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

  const [position, setPosition] = useState(coordinates! || [51.505, -0.09]);

  const handleMapClick = (latlng: any) => {
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

export default Map;
