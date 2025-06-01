import React, { useState } from 'react';
import '../styles/Alerts.css';

const alerts = [
  { id: '#20462', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'LOW' },
  { id: '#18933', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'LOW' },
  { id: '#45169', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'MEDIUM' },
  { id: '#34304', type: 'Brad Mason', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'MEDIUM' },
  { id: '#17188', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'HIGH' },
  { id: '#73003', type: 'PPE Violation', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'LOW' },
  { id: '#58825', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'LOW' },
  { id: '#44122', type: 'Proximity Alert', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'LOW' },
  { id: '#89094', type: 'PPE Violation', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'HIGH' },
  { id: '#85252', type: 'PPE Violation', worker: 'W-101', time: '21/11/2024, 14:30', severity: 'MEDIUM' },
];

const Alerts: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);

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
              <tr key={alert.id} onClick={() => setSelectedAlert(alert)} className={selectedAlert?.id === alert.id ? 'selected' : ''}>
                <td>{alert.id}</td>
                <td>{alert.type}</td>
                <td>Worker: {alert.worker}</td>
                <td>{alert.time}</td>
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
          <p><strong>Alert ID:</strong> A-001</p>
          <p><strong>Alert Type:</strong> {selectedAlert.type}</p>
          <p><strong>Worker ID:</strong> 123</p>
          <p><strong>Machine ID:</strong> 456</p>
          <p><strong>Distance:</strong> 1.5m</p>
          <p><strong>Severity:</strong> {selectedAlert.severity}</p>
          <p><strong>Timestamp:</strong> 21/11/2024, 14:32</p>
          <div className="detail-buttons">
            <button className="archive-btn">Archive Alert</button>
            <button className="close-btn" onClick={() => setSelectedAlert(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;