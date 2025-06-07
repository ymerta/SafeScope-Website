import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";
import "../styles/PPEPage.css";

type PPEAlert = {
  worker_id: string;
  missing_ppe: string[];
  timestamp: string;
};

const PPEAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<PPEAlert[]>([]);

  useEffect(() => {
    const alertsRef = ref(database, "ppe-detection-table");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed: PPEAlert[] = Object.values(data);
        setAlerts(parsed.reverse().slice(0, 6));
      }
    });
  }, []);

  return (
    <div className="ppe-alerts">
      <h3 style={{ textAlign: "center", textDecoration: "underline", marginBottom: "1rem" }}>
        PPE Alerts
      </h3>
      {alerts.length === 0 ? (
        <p>No critical items detected.</p>
      ) : (
        <div className="alerts-list">
          {alerts.map((alert, i) => (
            <div className="alert-card" key={i}>
              <p><b>Worker ID:</b> {alert.worker_id}</p>
              <p><b>Missing:</b> {alert.missing_ppe.join(", ")}</p>
              <p><b>Severity:</b> High</p>
              <p><b>Timestamp:</b> {alert.timestamp}</p>
              <button className="view-details-btn">View Details</button>
            </div>
          ))}
        </div>
      )}
      <button className="archive-btn">Archive Alerts</button>
    </div>
  );
};

export default PPEAlerts;