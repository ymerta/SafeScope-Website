import React from 'react';
import CameraFeed from '../components/CameraFeed';
import PPEAlerts from '../components/PPEalerts';
import DataTable from '../components/DataTable';
import '../styles/PPEPage.css';

const PPEPage: React.FC = () => {
 return (
    <div className="ppe-page">
      
      {/* Sol Bölüm */}
      <div className="left-section">
        {/* Camera Feed */}
        <div className="camera-feed-container">
          <CameraFeed />
        </div>
        {/* Data Table */}
        <div className="data-table-container">
          <DataTable />
        </div>
      </div>
      {/* Sağ Bölüm */}
      <div className="right-section">
        <PPEAlerts />
      </div>
    </div>
  );
};

export default PPEPage;