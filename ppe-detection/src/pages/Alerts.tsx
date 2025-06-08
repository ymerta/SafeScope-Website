import React, { useEffect, useState } from 'react';
import '../styles/Alerts.css';
import { database, ref, onValue, get, child, remove } from '../firebase';

type CombinedAlert = {
  id: string;
  type: 'Proximity Alert' | 'PPE Violation';
  worker_id: string;
  machine_id?: string;
  distance?: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  timestamp: string;
  missing_ppe?: string[];
};

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<CombinedAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<CombinedAlert | null>(null);

  useEffect(() => {
    const proximityRef = ref(database, 'proximity-alerts');
    const ppeRef = ref(database, 'ppe-detection-table');

    const proximityHandler = (snapshot: any) => {
      const data = snapshot.val();
      if (!data) return [];

      return Object.entries(data).map(([id, item]: any): CombinedAlert => ({
        id: `#${id.slice(-5)}`,
        type: 'Proximity Alert' as const,
        worker_id: item.head_id,
        machine_id: item.hands_id,
        distance: item.distance,
        severity: convertStatus(item.status),
        timestamp: item.timestamp,
      }));
    };

    const ppeHandler = (snapshot: any): CombinedAlert[] => {
      const data = snapshot.val();
      if (!data) return [];

      return Object.entries(data).map(([id, item]: any): CombinedAlert => ({
        id: `#${id.slice(-5)}`,
        type: 'PPE Violation' as const,
        worker_id: item.worker_id,
        missing_ppe: item.missing_ppe || [],
        severity: 'HIGH',
        timestamp: item.timestamp,
      }));
    };

    const fetchData = () => {
      onValue(proximityRef, (snapshot1) => {
        const proximity = proximityHandler(snapshot1);

        onValue(ppeRef, (snapshot2) => {
          const ppe = ppeHandler(snapshot2);

          const combined = [...proximity, ...ppe].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setAlerts(combined);
        });
      });
    };

    fetchData();
  }, []);

  const convertStatus = (status: string): 'LOW' | 'MEDIUM' | 'HIGH' => {
    switch (status?.toLowerCase()) {
      case 'safe':
        return 'LOW';
      case 'warning':
        return 'MEDIUM';
      case 'danger':
        return 'HIGH';
      default:
        return 'LOW';
    }
  };

  const handleArchiveAlert = async () => {
    if (!selectedAlert) return;

    const path =
      selectedAlert.type === 'Proximity Alert'
        ? 'proximity-alerts'
        : 'ppe-detection-table';

    const baseRef = ref(database, path);
    const snapshot = await get(baseRef);
    const data = snapshot.val();

    if (!data) return;

    const matchedEntry = Object.entries(data).find(
      ([_, value]: any) =>
        value.timestamp === selectedAlert.timestamp &&
        value.worker_id === selectedAlert.worker_id
    );

    if (!matchedEntry) {
      alert('Alert not found in Firebase.');
      return;
    }

    const [firebaseKey] = matchedEntry;
    await remove(child(baseRef, firebaseKey));

    setAlerts(prev => prev.filter(alert => alert !== selectedAlert));
    setSelectedAlert(null);
  };

  return (
    <div className="alerts-page">
      <div className="alerts-table-container">
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Alert ID</th>
              <th>Alert Type</th>
              <th>Worker/Machine ID</th>
              <th>Timestamp</th>
              <th>Severity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr
                key={alert.id}
                onClick={() => setSelectedAlert(alert)}
                className={selectedAlert?.id === alert.id ? 'selected' : ''}
              >
                <td>{alert.id}</td>
                <td>{alert.type}</td>
                <td>{`Worker: ${alert.worker_id}`}</td>
                <td>{alert.timestamp}</td>
                <td><span className={`severity ${alert.severity.toLowerCase()}`}>{alert.severity}</span></td>
                <td>➜</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedAlert && (
        <div className="alert-details-box">
          <h4>Alert Details ⚠️</h4>
          <p><strong>Alert ID:</strong> {selectedAlert.id}</p>
          <p><strong>Alert Type:</strong> {selectedAlert.type}</p>
          <p><strong>Worker ID:</strong> {selectedAlert.worker_id}</p>
          {selectedAlert.machine_id && <p><strong>Machine ID:</strong> {selectedAlert.machine_id}</p>}
          {selectedAlert.distance && <p><strong>Distance:</strong> {selectedAlert.distance.toFixed(2)} m</p>}
          {selectedAlert.missing_ppe && (
            <p><strong>Missing PPE:</strong> {selectedAlert.missing_ppe.join(', ')}</p>
          )}
          <p><strong>Severity:</strong> {selectedAlert.severity}</p>
          <p><strong>Timestamp:</strong> {selectedAlert.timestamp}</p>

          <div className="detail-buttons">
            <button className="archive-btn" onClick={handleArchiveAlert}>Archive Alert</button>
            <button className="close-btn" onClick={() => setSelectedAlert(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;