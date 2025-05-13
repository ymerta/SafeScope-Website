import React, { useState } from 'react';
import '../styles/UserGuide.css';

const UserGuide: React.FC = () => {
  const [selectedPPE, setSelectedPPE] = useState<string[]>(['Helmet']);

  const handlePPEChange = (ppe: string) => {
    setSelectedPPE((prev) =>
      prev.includes(ppe) ? prev.filter((item) => item !== ppe) : [...prev, ppe]
    );
  };

  return (
    <div className="user-guide">
      <div className="settings-box">
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
    </div>
  );
};

export default UserGuide;