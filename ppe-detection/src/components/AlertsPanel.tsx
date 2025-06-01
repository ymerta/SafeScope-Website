import React from 'react';

const AlertsPanel: React.FC = () => {
  return (
    <div className="alerts-panel">
      <h3>Real-Time Alerts</h3>
      <div className="alerts-list">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div className="alert-item" key={idx}>
            <p><strong>Proximity Alert</strong></p>
            <p>Worker ID: 123 | Machine ID: 456</p>
            <p>Distance: 1.8m | Timestamp: 21/11/2024, 14:32</p>
          </div>
        ))}
      </div>
      <button className="archive-button">Archive Alerts</button>
    </div>
  );
};

export default AlertsPanel;