import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon, LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { database, ref, onValue } from "../firebase";
const offset = 0.0001; // sabit ofset
const workerIcon = new Icon({ iconUrl: "/icons/worker-icon.png", iconSize: [32, 32] });
const machineIcon = new Icon({ iconUrl: "/icons/machine-icon.png", iconSize: [32, 32] });
const cameraIcon = new Icon({ iconUrl: "/icons/camera-icon.png", iconSize: [28, 28] });
// Tipler
type Alert = {
  id?: string;
  head_id: string;
  hands_id: string;
  distance: number;
  status: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
};

type CameraSetting = {
  camera_id: string;
  location: {
    lat: number;
    lng: number;
  };
};

const MapSection: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [cameraLocations, setCameraLocations] = useState<CameraSetting[]>([]);
  const center: LatLngExpression = [39.9208, 32.8541]; // Ankara Çankaya merkez

  // Kamera lokasyonlarını çek
  useEffect(() => {
    const camRef = ref(database, "camera-settings");
    onValue(camRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const cameras: CameraSetting[] = Object.entries(data).map(([camera_id, item]: any) => ({
          camera_id,
          location: item.location,
        }));
        setCameraLocations(cameras);
      }
    });
  }, []);

  // Alertleri çek
  useEffect(() => {
    const alertsRef = ref(database, "proximity-alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed: Alert[] = Object.entries(data).map(([id, item]: any) => ({
          id,
          ...item,
        }));
        setAlerts(parsed.slice(-10));
      }
    });
  }, []);

  return (
    <div className="map-section">
      <h3>Live Map</h3>
      <div style={{ height: "100%", flex: 1 }}>
        <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* 🔴 Alert Marker'ları */}
          {alerts.map((alert, idx) => {
  const workerPos: LatLngExpression = [
    alert.location.lat + offset,
    alert.location.lng + offset,
  ];
  const machinePos: LatLngExpression = [
    alert.location.lat - offset,
    alert.location.lng - offset,
  ];

  return (
    <React.Fragment key={idx}>
      <Marker position={workerPos} icon={workerIcon}>
        <Popup>
          <b>Worker:</b> {alert.head_id}<br />
          <b>Status:</b> {alert.status}<br />
          <b>Distance:</b> {alert.distance.toFixed(2)} m
        </Popup>
      </Marker>
      <Marker position={machinePos} icon={machineIcon}>
        <Popup>
          <b>Machine:</b> {alert.hands_id}<br />
          <b>Status:</b> {alert.status}<br />
          <b>Distance:</b> {alert.distance.toFixed(2)} m
        </Popup>
      </Marker>
    </React.Fragment>
  );
})}

          {/* 📸 Kamera Marker'ları */}
          {cameraLocations.map((cam, idx) => (
            <Marker
              key={`camera-${idx}`}
              position={[cam.location.lat, cam.location.lng] as LatLngExpression}
              icon={cameraIcon}
            >
              <Popup>
                <b>Camera:</b> {cam.camera_id}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSection;