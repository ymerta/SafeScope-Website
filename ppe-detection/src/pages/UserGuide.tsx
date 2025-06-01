import React, { useState } from 'react';
import '../styles/UserGuide.css';

const UserGuide: React.FC = () => {
  const [selectedPPE, setSelectedPPE] = useState<string[]>(['Helmet']);
  const [distance, setDistance] = useState(5);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handlePPEChange = (ppe: string) => {
    setSelectedPPE((prev) =>
      prev.includes(ppe) ? prev.filter((item) => item !== ppe) : [...prev, ppe]
    );
  };

  return (
    <div className="user-guide">
      <div className="user-guide-content">
        {/* Proximity Threshold */}
        <div className="settings-box slider">
          <h3>Proximity Threshold Settings</h3>
          <input
            type="range"
            min="0"
            max="10"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          />
          <p>Selected Distance: {distance.toFixed(1)} m</p>
          <button className="save-button">Save Settings</button>
        </div>

        {/* PPE Settings */}
        <div className="settings-box ppe">
          <h3>PPE Detection Settings</h3>
          <div className="checkbox-group">
            {['Helmet', 'Vest', 'Gloves', 'Boots', 'Safety Goggles'].map((ppe) => (
              <label key={ppe}>
                <input
                  type="checkbox"
                  checked={selectedPPE.includes(ppe)}
                  onChange={() => handlePPEChange(ppe)}
                />
                {ppe}
              </label>
            ))}
          </div>
          <button className="save-button">Save Settings</button>
        </div>

        {/* Notification Settings */}
        <div className="settings-box notify">
          <h3>Notification Settings</h3>
          <div className="input-group">
            <label>
              Email Address:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          <button className="save-button">Save Notification Settings</button>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;