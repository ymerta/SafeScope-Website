import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";

type PPEDetection = {
  worker_id: string;
  missing_ppe: string[];
  detected_ppe?: string[];
  timestamp: string;
};

const PPEDataTable: React.FC = () => {
  const [rows, setRows] = useState<PPEDetection[]>([]);

  useEffect(() => {
    const detectionRef = ref(database, "ppe-detection-table");
    onValue(detectionRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed: PPEDetection[] = Object.values(data);
        // Yeni gelenler en üste gelsin
        setRows(parsed.reverse().slice(0, 10));
      }
    });
  }, []);

  return (
    <div className="data-table">
      <h2>Live PPE Detection Table</h2>
      <table>
        <thead>
          <tr>
            <th>Worker ID</th>
            <th>Detected PPE</th>
            <th>Missing PPE</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td>{row.worker_id || "Unknown"}</td>
              <td>{row.detected_ppe ? row.detected_ppe.join(", ") : "-"}</td>
              <td>{row.missing_ppe ? row.missing_ppe.join(", ") : "-"}</td>
              <td>{row.timestamp || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PPEDataTable;