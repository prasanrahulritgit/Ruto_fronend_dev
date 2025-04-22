import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { FaVideo, FaMicrophone, FaCamera, FaThermometerHalf, FaBug, FaCogs, FaUsb } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>RUTOMATRIX</div>
      <nav className={styles.menu}>
        <ul>
          <li><Link to="/"><FaVideo /> Preview</Link></li>
          <li><Link to="/audio"><FaMicrophone /> Audio</Link></li>
          <li><Link to="/camera"><FaCamera /> Camera</Link></li>
          <li><Link to="/thermal"><FaThermometerHalf /> Thermal</Link></li>
          <li><Link to="/usb"><FaUsb /> USB/IP</Link></li>
          <li><Link to="/debugger"><FaBug /> Debugger</Link></li>
          <li><Link to="/settings"><FaCogs /> Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
