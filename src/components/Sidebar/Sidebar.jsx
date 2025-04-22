import React from 'react';
import styles from './Sidebar.module.css';
import { FaVideo, FaMicrophone, FaCamera, FaThermometerHalf, FaBug, FaCogs, FaUsb } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>RUTOMATRIX</div>
      <nav className={styles.menu}>
        <ul>
          <li><FaVideo /> Preview</li>
          <li><FaMicrophone /> Audio</li>
          <li><FaCamera /> Camera</li>
          <li><FaThermometerHalf /> Thermal</li>
          <li><FaUsb /> USB/IP</li>
          <li><FaBug /> Debugger</li>
          <li><FaCogs /> Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
