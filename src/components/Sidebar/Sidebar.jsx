import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Video,
  Volume2,
  Camera as CameraIcon,
  ThermometerSun,
  Usb,
  Code,
  Share2,
  LayoutGrid,
  Brain
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const menuItems = [
    { to: '/',           label: 'Streamer',   icon: <Video size={18} /> },
    { to: '/audio',      label: 'Audio',      icon: <Volume2 size={18} /> },
    { to: '/camera',     label: 'Camera',     icon: <CameraIcon size={18} /> },
    { to: '/thermal',    label: 'Thermal',    icon: <ThermometerSun size={18} /> },
    { to: '/usb',        label: 'USB IP',     icon: <Usb size={18} /> },
    { to: '/debugger',   label: 'Debugger',   icon: <Code size={18} /> },
    { to: '/protocol',   label: 'Protocol',   icon: <Share2 size={18} /> },
    { to: '/ruto-valut', label: 'Ruto Valut', icon: <Brain size={18} /> },
    { to: '/settings',   label: 'Settings',   icon: <LayoutGrid size={18} /> },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.spacer} />
      <nav className={styles.menu}>
        <ul>
          {menuItems.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {item.icon}
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
