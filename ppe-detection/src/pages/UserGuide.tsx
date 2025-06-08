import React, { useState, useEffect } from "react";
import "../styles/UserGuide.css";
import { database, ref, set, onValue, remove } from "../firebase";
import CameraLocationPicker from "../components/CameraLocationPicker";

const UserGuide: React.FC = () => {
  const [selectedPPE, setSelectedPPE] = useState<string[]>([]);
  const [distance, setDistance] = useState(5);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cameraId, setCameraId] = useState("camera_1");
  const [lat, setLat] = useState(39.9208);
  const [lng, setLng] = useState(32.8541);
  const [showPopup, setShowPopup] = useState(false);
  const [cameraList, setCameraList] = useState<any[]>([]);

  // ✅ PPE sınıfları
  const PPE_CLASSES = [
    "helmet", "gloves", "safety-vest", "face-mask",
    "glasses", "safety-suit", "ear-mufs", "face-guard"
  ];

  const handlePPEChange = (ppe: string) => {
    setSelectedPPE((prev) =>
      prev.includes(ppe) ? prev.filter((item) => item !== ppe) : [...prev, ppe]
    );
  };

  const handleMapLocation = (lat: number, lng: number) => {
    setLat(lat);
    setLng(lng);
  };

  const saveSettings = () => {
    const config = {
      camera_id: cameraId,
      location: { lat, lng },
      proximity_threshold: distance,
      selected_ppe: selectedPPE,
      email,
      phone,
    };
    set(ref(database, `camera-settings/${cameraId}`), config);
    setShowPopup(false);
  };

  const deleteCamera = (id: string) => {
    if (window.confirm(`Are you sure you want to delete ${id}?`)) {
      remove(ref(database, `camera-settings/${id}`));
    }
  };

  useEffect(() => {
    const camerasRef = ref(database, "camera-settings");
    onValue(camerasRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data[cameraId]) {
        const current = data[cameraId];
        setDistance(current.proximity_threshold || 5);
        setSelectedPPE(current.selected_ppe || []);
        setLat(current.location?.lat || 39.9208);
        setLng(current.location?.lng || 32.8541);
        setEmail(current.email || "");
        setPhone(current.phone || "");
      }
      if (data) {
        setCameraList(Object.values(data));
      }
    });
  }, [cameraId]);

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
          <button className="save-button" onClick={saveSettings}>Save Settings</button>
        </div>

        {/* PPE Settings */}
        <div className="settings-box ppe">
          <h3>PPE Detection Settings</h3>
          <div className="checkbox-group">
            {PPE_CLASSES.map((ppe) => (
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
          <button className="save-button" onClick={saveSettings}>Save Settings</button>
        </div>

      {/* PPE Settings */}
<div className="settings-box ppe">
  <h3>PPE Detection Settings</h3>

  {/* Kamera Seçici */}
  <label style={{ marginBottom: '1rem', display: 'block' }}>
    Select Camera:
    <select
      style={{ marginTop: '0.5rem', padding: '0.5rem', borderRadius: '6px' }}
      value={cameraId}
      onChange={(e) => setCameraId(e.target.value)}
    >
      {cameraList.map((cam: any) => (
        <option key={cam.camera_id} value={cam.camera_id}>
          {cam.camera_id}
        </option>
      ))}
    </select>
  </label>

  {/* Checkboxlar */}
  <div className="checkbox-group">
    {PPE_CLASSES.map((ppe) => (
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
  <button className="save-button" onClick={saveSettings}>
    Save Settings
  </button>
</div>

        {/* Notification Settings */}
        <div className="settings-box notify">
          <h3>Notification Settings</h3>
          <div className="input-group">
            <label>
              Email Address:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Phone Number:
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
          </div>
          <button className="save-button">Save Notification Settings</button>
        </div>

        {/* Camera Management */}
        <div className="settings-box">
          <h3>Camera Management</h3>
          <button className="save-button" onClick={() => setShowPopup(true)}>+ Add Camera</button>
          <ul style={{ marginTop: "1rem", color: "#ccc", paddingLeft: "1rem" }}>
            {cameraList.map((c, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>
                  {c.camera_id} - ({c.location.lat.toFixed(5)}, {c.location.lng.toFixed(5)})
                </span>
                <button
                  style={{
                    marginLeft: "1rem",
                    padding: "4px 8px",
                    backgroundColor: "#e63946",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => deleteCamera(c.camera_id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modal */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>Add New Camera</h3>
              <CameraLocationPicker onLocationSelect={handleMapLocation} />
              <label>
                Camera ID:
                <input type="text" value={cameraId} onChange={(e) => setCameraId(e.target.value)} />
              </label>
              <label>
                Latitude:
                <input type="number" value={lat} onChange={(e) => setLat(Number(e.target.value))} />
              </label>
              <label>
                Longitude:
                <input type="number" value={lng} onChange={(e) => setLng(Number(e.target.value))} />
              </label>
              <button className="save-button" onClick={saveSettings}>
                Save Settings
              </button>
              <button
                className="save-button"
                style={{ backgroundColor: "#444", marginTop: "0.5rem" }}
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserGuide;