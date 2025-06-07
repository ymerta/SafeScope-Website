import { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";

type ProximityAlert = {
  head_id: string;
  hands_id: string;
  distance: number;
  status: string;
  timestamp: string;
  camera_id?: string; // ✅ opsiyonel olarak tanımla
};

const ProximityTable = () => {
  const [rows, setRows] = useState<ProximityAlert[]>([]);

  useEffect(() => {
    const alertsRef = ref(database, "proximity-alerts");
    onValue(alertsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const alerts = Object.values(data) as ProximityAlert[];
        setRows(alerts.reverse().slice(0, 5)); // son 5 alert
      }
    });
  }, []);

  return (
    <div className="proximity-table">
      <h3>Latest Proximity Alerts</h3>
      <table>
        <thead>
          <tr>
            <th>Worker ID</th>
            <th>Machine ID</th>
            <th>Distance (m)</th>
            <th>Status</th>
            <th>Camera</th> {/* ✅ Yeni kolon */}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => (
            <tr key={index}>
              <td>{item.head_id}</td>
              <td>{item.hands_id}</td>
              <td>{item.distance.toFixed(2)}</td>
              <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
              <td>{item.camera_id || "Unknown"}</td> {/* ✅ Kamera bilgisi */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProximityTable;