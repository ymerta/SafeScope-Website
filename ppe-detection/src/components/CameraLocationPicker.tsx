// src/components/CameraLocationPicker.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  onLocationSelect: (lat: number, lng: number) => void;
};

const CameraLocationPicker: React.FC<Props> = ({ onLocationSelect }) => {
  const [markerPos, setMarkerPos] = useState<LatLngExpression | null>(null);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPos(e.latlng);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });

    return markerPos ? <Marker position={markerPos} /> : null;
  };

  return (
    <MapContainer
      center={[39.9208, 32.8541]}
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default CameraLocationPicker;