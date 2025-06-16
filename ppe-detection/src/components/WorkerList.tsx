import React, { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";
import "../styles/WorkerList.css";

type Worker = {
  name: string;
  badge: string;
  role: string;
};

const WorkerList: React.FC = () => {
  const [workers, setWorkers] = useState<{ [id: string]: Worker }>({});

  useEffect(() => {
    const workerRef = ref(database, "workers");
    onValue(workerRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setWorkers(data);
    });
  }, []);

  return (
    <div className="settings-box">
      <h3>Registered Workers</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem", color: "white" }}>
        <thead>
          <tr>
            <th style={{ padding: "0.5rem", borderBottom: "1px solid #555" }}>Name</th>
            <th style={{ padding: "0.5rem", borderBottom: "1px solid #555" }}>Badge</th>
            <th style={{ padding: "0.5rem", borderBottom: "1px solid #555" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(workers).map(([id, worker]) => (
            <tr key={id}>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #333" }}>{worker.name}</td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #333" }}>{worker.badge}</td>
              <td style={{ padding: "0.5rem", borderBottom: "1px solid #333" }}>{worker.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerList;