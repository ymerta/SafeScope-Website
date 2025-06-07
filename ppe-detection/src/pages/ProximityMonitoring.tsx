import React, { useEffect, useState } from 'react';
import '../styles/ProximityMonitoring.css';
import MapSection from '../components/MapSection';
import CameraSection from '../components/CameraSection';
import ProximityTable from '../components/ProximityTable';
import AlertsPanel from '../components/AlertsPanel';
import { database, ref, onValue } from '../firebase';

const ProximityMonitoring: React.FC = () => {
  const [view, setView] = useState<'map' | 'camera'>('map');
  const [cameraList, setCameraList] = useState<string[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>('camera_1');

  useEffect(() => {
    const camRef = ref(database, 'camera-settings');
    onValue(camRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ids = Object.keys(data);
        setCameraList(ids);
        if (!ids.includes(selectedCamera)) {
          setSelectedCamera(ids[0]);
        }
      }
    });
  }, [selectedCamera]);

  return (
    <div className="proximity-page">
      <div className="left-section">
        <div className="view-toggle">
          <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}>
            Live Map
          </button>
          <button className={view === 'camera' ? 'active' : ''} onClick={() => setView('camera')}>
            Live Camera
          </button>
        </div>

        {view === 'camera' && (
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="camera-select">Select Camera:</label>
            <select
              id="camera-select"
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
            >
              {cameraList.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
        )}

        {view === 'map' ? <MapSection /> : <CameraSection cameraId={selectedCamera} />}
        <ProximityTable />
      </div>
      <div className="right-section">
        <AlertsPanel />
      </div>
    </div>
  );
};

export default ProximityMonitoring;