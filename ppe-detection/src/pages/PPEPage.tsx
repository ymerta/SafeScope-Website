import React, { useEffect, useState } from 'react';
import CameraFeed from '../components/CameraFeed';
import PPEAlerts from '../components/PPEalerts';
import PPEDataTable from '../components/DataTable';
import '../styles/PPEPage.css';

const PPEPage: React.FC = () => {
  const [detections, setDetections] = useState<any[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/ppe");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDetections(data.detections || []);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.warn("WebSocket bağlantısı kapandı.");
    };

    return () => socket.close();
  }, []);

  return (
    <div className="ppe-page">
      {/* Sol Bölüm */}
      <div className="left-section">
        <div className="camera-feed-container">
          <CameraFeed />
        </div>
        <div className="data-table-container">
        <PPEDataTable />
        </div>
      </div>

      {/* Sağ Bölüm */}
      <div className="right-section">
        <PPEAlerts  />
      </div>
    </div>
  );
};

export default PPEPage;