import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PPEPage from './pages/PPEPage';
import ProximityMonitoring from './pages/ProximityMonitoring';
import Alerts from './pages/Alerts';
import UserGuide from './pages/UserGuide';
import Dashboard from './pages/Dashboard';
import './styles/App.css';


export const PauseContext = createContext<{ isPaused: boolean; togglePause: () => void }>({
  isPaused: false,
  togglePause: () => {},
});

const App: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <PauseContext.Provider value={{ isPaused, togglePause }}>
      <Router>
        <div className="app">
          <Navbar />
          <div className="content">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} /> {/* Dashboard ana sayfa olarak ayarlandı */}
                <Route path="/ppe-detection" element={<PPEPage />} />
                <Route path="/proximity-monitoring" element={<ProximityMonitoring />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/user-guide" element={<UserGuide />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </PauseContext.Provider>
  );
};

export default App;