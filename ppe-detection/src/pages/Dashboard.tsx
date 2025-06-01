import React from "react";
import { Toggle } from "../components/ui/toggle";
import Card, { CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-mockup">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome to the SafeScope!</h1>
        <p>Start using the system to ensure a safe and efficient working environment</p>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Active Workers</p>
          <h2>58</h2>
        </div>
        <div className="stat-card">
          <p>Total Active Machines</p>
          <h2>12</h2>
        </div>
        <div className="stat-card">
          <p>Alerts Today</p>
          <h2>5</h2>
        </div>
        <div className="stat-card">
          <p>System Status: <span className="status-green">Active</span></p>
          <div className="toggle-wrapper">
            <Toggle defaultPressed />
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="bottom-grid">
        {/* Alerts */}
        <div className="alerts-panel">
          <h2>Alerts</h2>
          <div className="alert-list">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium">⚠️ Alert Type: Proximity Alert</p>
                  <p>Worker ID: 123</p>
                  <p>Machine ID: 456</p>
                  <p>Timestamp: 21/11/2024, 14:32</p>
                  <p className="text-red-500 font-semibold">Severity: High</p>
                  <Button variant="default">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="center-btn">
            <Button variant="outline">View All Alerts</Button>
          </div>
        </div>

        {/* Guide */}
        <div className="guide-panel">
          <h2>How to Use the System?</h2>
          <ul>
            <li>Monitor real-time worker and machine positions in the “Proximity Monitoring” tab</li>
            <li>Ensure PPE compliance in the “PPE Detection” tab</li>
            <li>Review alerts in the “Alert History” tab</li>
          </ul>
          <Button>Help</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;