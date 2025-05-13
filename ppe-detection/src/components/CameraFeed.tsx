import React, { useContext } from 'react';
import '../styles/CameraFeed.css';
import { PauseContext } from '../App';

const CameraFeed: React.FC = () => {
  const { isPaused, togglePause } = useContext(PauseContext);

  return (
    <div className="camera-feed">
      <h2>Camera Feed</h2>
      <div className="video-container">
        {isPaused ? (
          <div className="placeholder">
            <p>Video Paused</p>
          </div>
        ) : (
          <img
            src="http://localhost:8080/video_feed"
            className="video-feed"
            alt="Camera Feed"
          />
        )}
        <button className="pause-button" onClick={togglePause}>
          {isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </div>
  );
};

export default CameraFeed;