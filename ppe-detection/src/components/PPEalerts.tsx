import React, { useEffect, useState } from "react";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import "../styles/PPEAlerts.css";

const PPEAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const ppeRef = ref(database, "/ppe-detection"); 
    const unsubscribe = onValue(ppeRef, (snapshot) => {
      const firebaseData = snapshot.val();
      if (firebaseData) {
        const formattedData = Object.entries(firebaseData)
          .map(([key, item]: [string, any]) => {
            const missingPPECount = item.missing?.length || 0;
            let severity = "";

       
            if (missingPPECount === 2) {
              severity = "High";
            } else if (missingPPECount === 1) {
              severity = "Medium";
            }

            if (missingPPECount > 0) {
              return {
                id: key,
                missing: item.missing?.join(", ") || "None",
                severity,
                timestamp: item.timestamp || "No timestamp",
              };
            }
            return null; 
          })
          .filter((alert) => alert !== null) 
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        setAlerts(formattedData);
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className="ppe-alerts">
      <h2>PPE Alerts</h2>
      <div className="alerts-container">
        {alerts.map((alert) => (
          <div key={alert.id} className="ppe-alert">
            <div className="alert-details">
              <p>
                <strong>Missing PPE:</strong> {alert.missing}
              </p>
              <p>
                <strong>Severity:</strong> {alert.severity}
              </p>
              <p>
                <strong>Timestamp:</strong> {alert.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PPEAlerts;