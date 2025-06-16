import React, { useEffect, useState } from "react";
import { Toggle } from "../components/ui/toggle";
import Card, { CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import "../styles/Dashboard.css";
import { database, ref, onValue, set } from "../firebase";

const Dashboard: React.FC = () => {
  const [workers, setWorkers] = useState<number>(0);
  const [machines, setMachines] = useState<number>(0);
  const [alertsToday, setAlertsToday] = useState<number>(0);
  const [systemStatus, setSystemStatus] = useState<"active" | "inactive">("active");
  const [latestAlerts, setLatestAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    const ppeRef = ref(database, "ppe-detection-table");
    onValue(ppeRef, (snapshot) => {
      const data = snapshot.val();
      const workerIds = new Set<string>();
      let todayCount = 0;

      const ppeAlerts = data ? Object.entries(data).map(([id, item]: any) => {
        if (item.worker_id) workerIds.add(item.worker_id);
        if (item.timestamp?.startsWith(today)) todayCount++;
        return {
          id: `#${id.slice(-5)}`,
          type: "PPE Violation",
          worker_id: item.worker_id,
          severity: "HIGH",
          timestamp: item.timestamp,
          missing_ppe: item.missing_ppe || [],
        };
      }) : [];

      setWorkers(workerIds.size);
      setAlertsToday(todayCount);
      combineAndSortAlerts(ppeAlerts);
    });

    const proxRef = ref(database, "proximity-alerts");
    onValue(proxRef, (snapshot) => {
      const data = snapshot.val();
      const machineIds = new Set<string>();

      const proxAlerts = data ? Object.entries(data).map(([id, item]: any) => {
        if (item.hands_id) machineIds.add(item.hands_id);
        return {
          id: `#${id.slice(-5)}`,
          type: "Proximity Alert",
          worker_id: item.head_id,
          machine_id: item.hands_id,
          distance: item.distance,
          severity: convertStatus(item.status),
          timestamp: item.timestamp,
        };
      }) : [];

      setMachines(machineIds.size);
      combineAndSortAlerts(proxAlerts);
    });

    const statusRef = ref(database, "system-status");
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const value = snapshot.val();
      if ((value === "active" || value === "inactive") && value !== systemStatus) {
        setSystemStatus(value);
      }
    });

    return () => unsubscribe(); // cleanup listener
  }, []);

  const combineAndSortAlerts = (incoming: any[]) => {
    setLatestAlerts((prev) => {
      const combined = [...prev, ...incoming];
      const uniqueById = Array.from(new Map(combined.map(i => [i.timestamp + i.worker_id, i])).values());
      return uniqueById.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    });
  };

  const convertStatus = (status: string): 'LOW' | 'MEDIUM' | 'HIGH' => {
    switch (status?.toLowerCase()) {
      case 'safe': return 'LOW';
      case 'warning': return 'MEDIUM';
      case 'danger': return 'HIGH';
      default: return 'LOW';
    }
  };

  const toggleSystemStatus = () => {
    const newStatus = systemStatus === "active" ? "inactive" : "active";
    if (newStatus !== systemStatus) {
      set(ref(database, "system-status"), newStatus);
    }
  };

  return (
    <div className="dashboard-mockup">
      <div className="welcome-banner">
        <h1>Welcome to the SafeScope!</h1>
        <p>Start using the system to ensure a safe and efficient working environment</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><p>Total Active Workers</p><h2>{workers}</h2></div>
        <div className="stat-card"><p>Total Active Machines</p><h2>{machines}</h2></div>
        <div className="stat-card"><p>Alerts Today</p><h2>{alertsToday}</h2></div>
        <div className="stat-card">
          <p>System Status: <span className={systemStatus === "active" ? "status-green" : "status-red"}>{systemStatus}</span></p>
          <div className="toggle-wrapper">
            <Toggle defaultPressed={systemStatus === "active"} onToggle={toggleSystemStatus} />
          </div>
        </div>
      </div>

      <div className="bottom-grid">
        <div className="alerts-panell">
          <h2>Alerts</h2>
          <div className="alert-list">
            {latestAlerts.map((alert, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">⚠️ Alert Type: {alert.type}</p>
                  <p>Worker ID: {alert.worker_id}</p>
                  {alert.machine_id && <p>Machine ID: {alert.machine_id}</p>}
                  <p>Timestamp: {alert.timestamp}</p>
                  <p className="font-semibold text-red-500">Severity: {alert.severity}</p>
                  <Button variant="default" onClick={() => setSelectedAlert(alert)}>View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="center-btn">
            <Button variant="outline" onClick={() => window.location.href = "/alerts"}>View All Alerts</Button>
          </div>
        </div>

        <div className="guide-panel">
          <h2>How to Use the System?</h2>
          <ul>
            <li>Monitor real-time worker and machine positions in the “Proximity Monitoring” tab</li>
            <li>Ensure PPE compliance in the “PPE Detection” tab</li>
            <li>Review alerts in the “Alert History” tab</li>
          </ul>
          <Button>Help</Button>
        </div>
      </div>

      {selectedAlert && (
        <div className="alert-details-box">
          <h4>Alert Details ⚠️</h4>
          <p><strong>Alert ID:</strong> {selectedAlert.id}</p>
          <p><strong>Alert Type:</strong> {selectedAlert.type}</p>
          <p><strong>Worker ID:</strong> {selectedAlert.worker_id}</p>
          {selectedAlert.machine_id && <p><strong>Machine ID:</strong> {selectedAlert.machine_id}</p>}
          {selectedAlert.distance && <p><strong>Distance:</strong> {selectedAlert.distance.toFixed(2)} m</p>}
          {selectedAlert.missing_ppe && <p><strong>Missing PPE:</strong> {selectedAlert.missing_ppe.join(', ')}</p>}
          <p><strong>Severity:</strong> {selectedAlert.severity}</p>
          <p><strong>Timestamp:</strong> {selectedAlert.timestamp}</p>
          <div className="detail-buttons">
            <Button variant="outline" onClick={() => setSelectedAlert(null)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;