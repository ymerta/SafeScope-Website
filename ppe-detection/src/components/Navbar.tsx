import React, { useContext } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { PauseContext } from '../App';

const Navbar: React.FC = () => {
  const { isPaused } = useContext(PauseContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="SafeScope Logo" className="navbar-logo" />
        <span className="navbar-title">SafeScope</span>
      </div>
      <div className="navbar-right">
        <span className="status">{isPaused ? 'Inactive ○' : 'Active ●'}</span>
        <span className="user">John Doe</span>
      </div>
    </nav>
  );
};

export default Navbar;