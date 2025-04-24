import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Video,
  Volume2,
  Camera,
  Database,
  Cpu,
  Code,
  Share2,
  LayoutGrid
} from 'lucide-react';
import styles from './Navbar.module.css';

const routeIcons = {
  '/': <Video size={20} color="#fff" />,
  '/streamer': <Video size={20} color="#fff" />,
  '/audio': <Volume2 size={20} color="#fff" />,
  '/camera': <Camera size={20} color="#fff" />,
  '/thermal': <Database size={20} color="#fff" />,
  '/usb': <Cpu size={20} color="#fff" />,
  '/debugger': <Code size={20} color="#fff" />,
  '/protocol': <Share2 size={20} color="#fff" />,
  '/settings': <LayoutGrid size={20} color="#fff" />,
};

const Navbar = () => {
  const location = useLocation();
  const icon = routeIcons[location.pathname] || <Video size={20} color="#fff" />;

  return (
    <div className={styles.navbar}>
      {icon}
    </div>
  );
};

export default Navbar;
