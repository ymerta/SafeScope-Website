import React from 'react';
import '../styles/CameraSection.css';

interface CameraSectionProps {
  cameraId: string;
}

const CameraSection: React.FC<CameraSectionProps> = ({ cameraId }) => {
  return (
    <div className="camera-section">
      <h3>Live Camera: {cameraId}</h3>

      <div className="camera-placeholder">
        <img
          src={`http://localhost:8000/proximity_feed?camera=${cameraId}`}
          alt={`Live feed for ${cameraId}`}
          style={{ width: '100%', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default CameraSection;