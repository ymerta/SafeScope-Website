import { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";

type ProximityAlert = {
  head_id: string;
  hands_id: string;
  distance: number;
  status: string;
  timestamp: string;
};

const AlertsPanel = () => {
  const [dangerAlerts, setDangerAlerts] = useState<ProximityAlert[]>([]);

  useEffect(() => {
    const alertsRef = ref(database, "proximity-alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allAlerts = Object.values(data) as ProximityAlert[];
        const filtered = allAlerts
          .filter((alert) => alert.status.toLowerCase() === "danger")
          .reverse()
          .slice(0, 5);
        setDangerAlerts(filtered);
      }
    });
  }, []);

  return (
    <div className="alerts-panel">
      <h3>🚨 Real-Time Danger Alerts</h3>
      <div className="alerts-list">
        {dangerAlerts.length === 0 && (
          <p style={{ color: "#ccc" }}>No danger alerts at the moment.</p>
        )}
        {dangerAlerts.map((alert, index) => (
          <div key={index} className="alert-item danger">
            <p><strong>Worker ID:</strong> {alert.head_id}</p>
            <p><strong>Machine ID:</strong> {alert.hands_id}</p>
            <p><strong>Distance:</strong> {alert.distance.toFixed(2)} m</p>
            <p><strong>Status:</strong> {alert.status}</p>
            <p><strong>Time:</strong> {alert.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;