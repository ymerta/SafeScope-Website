import React from 'react';
import '../styles/ProximityMonitoring.css';
import MapSection from '../components/MapSection';
import DataTable from '../components/DataTable';
import AlertsPanel from '../components/AlertsPanel';
import ProximityTable from '../components/ProximityTable';

const ProximityMonitoring: React.FC = () => {
  return (
    <div className="proximity-page">
      <div className="left-section">
        <MapSection />
        <ProximityTable />
      </div>
      <div className="right-section">
        <AlertsPanel />
      </div>
    </div>
  );
};

export default ProximityMonitoring;