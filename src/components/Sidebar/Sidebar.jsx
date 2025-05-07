import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MonitorSmartphone,
  Volume2,
  Camera as CameraIcon,
  ThermometerSun,
  Usb,
  Code,
  Share2,
  LayoutGrid,
  Brain,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { to: '/videostream', label: 'VirtualDesk', icon: <MonitorSmartphone size={18} /> },
    { to: '/audio', label: 'Audio', icon: <Volume2 size={18} /> },
    { to: '/camera', label: 'Camera', icon: <CameraIcon size={18} /> },
    { to: '/thermal', label: 'Thermal', icon: <ThermometerSun size={18} /> },
    { to: '/usb', label: 'USB IP', icon: <Usb size={18} /> },
    { to: '/debugger', label: 'Debugger', icon: <Code size={18} /> },
    { to: '/protocol', label: 'Protocol', icon: <Share2 size={18} /> },
    { to: '/ruto-vault', label: 'Ruto Vault', icon: <Brain size={18} /> },
    { to: '/settings', label: 'Settings', icon: <LayoutGrid size={18} /> },
  ];

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoutMenu}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <LogOut size={18} />
          <span className={styles.label}>Logout</span>
        </button>
      </div>

      <div className={styles.menu}>
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
      </div>
    </div>
  );
};

export default Sidebar;
