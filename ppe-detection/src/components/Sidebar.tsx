import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaVideo, FaBell, FaBook, FaDesktop } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h4>Home</h4>
      <hr />
      <ul>
        <li>
        <NavLink
  to="/"
  className={({ isActive }: { isActive: boolean }) =>
    isActive ? 'active' : ''
  }
>
  <span className="icon"><FaHome /></span>
  Dashboard
</NavLink>
        </li>
      </ul>
      <h4>Pages</h4>
      <hr />
      <ul>
        <li>
          <NavLink
            to="/ppe-detection" 
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'active' : ''
            }
          >
            <span className="icon"><FaVideo /></span>
            PPE Detection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/proximity-monitoring"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'active' : ''
            }
          >
            <span className="icon"><FaDesktop /></span>
            Proximity Monitoring
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alerts"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'active' : ''
            }
          >
            <span className="icon"><FaBell /></span>
            Alerts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/user-guide"
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? 'active' : ''
            }
          >
            <span className="icon"><FaBook /></span>
            User Guide
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;