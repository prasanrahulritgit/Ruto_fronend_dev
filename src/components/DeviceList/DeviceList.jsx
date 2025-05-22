/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeviceList.css';
import { Sun, Moon } from 'lucide-react'; // Lucide icons
 
const initialDevices = [
  {
    ip: '100.123.222.23',
    status: 'Available',
    location: 'San Jose',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
  {
    ip: '100.64.44.108',
    status: 'Available',
    location: 'San Jose',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
  {
    ip: '100.92.165.10',
    status: 'Available',
    location: 'Austin',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
];
 
function DeviceList() {
  const [devices, setDevices] = useState(initialDevices);
  const [sortBy, setSortBy] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();
 
  const handleSortChange = (e) => {
    const location = e.target.value;
    setSortBy(location);
    if (location === '') {
      setDevices(initialDevices); // Show all devices when no filter is selected
    } else {
      const filteredDevices = initialDevices.filter((device) => device.location === location);
      setDevices(filteredDevices); // Show devices that match the selected location
    }
  };
 
  const handleResetSort = () => {
    setSortBy('');
    setDevices(initialDevices); // Reset to show all devices
  };
 
  const handleLaunch = () => {
    navigate('/videostream');
  };
 
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };
 
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
 
  return (
    <div className={`device-list-container ${theme}`}>
      {   }
      <div className="theme-toggle-top-right">
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-checkbox"
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <label htmlFor="theme-toggle" className="theme-label">
          <span>
            {theme === 'light' ? <Sun size={20} color= "#1281d6" /> : <Moon size={20} color= "#1281d6" />}
          </span>
        </label>
      </div>
 
      <div className="device-list-header">Available Devices</div>
 
      {}
      <div className="device-sort">
        <label htmlFor="locationSort" className="sort-label">Sort by Location:</label>
        <select id="locationSort" value={sortBy} onChange={handleSortChange}>
          <option value="">-- All Devices --</option>
          <option value="San Jose">San Jose</option>
          <option value="Austin">Austin</option>
        </select>
        {sortBy && (
          <button className="reset-sort-btn" onClick={handleResetSort}>
            Reset
          </button>
        )}
      </div>
 
      <div className="device-grid">
        {devices.map((device, index) => (
          <div className="device-card" key={index}>
            <div className="device-ip">{device.ip}</div>
            <div className="device-info">Status: {device.status}</div>
            <div className="device-info">Location: {device.location}</div>
            <div className="device-info">Protocol: {device.protocol}</div>
            <div className="device-info">Chip Model: {device.chipModel}</div>
            <button className="launch-btn" onClick={handleLaunch}>
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default DeviceList;*/

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeviceList.css';
import { Sun, Moon } from 'lucide-react';

function DeviceList() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  // Fetch devices from API
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/devices/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDevices(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleResetSort = () => {
    setSortBy('');
  };

  const handleLaunch = (deviceId) => {
    navigate(`/videostream/${deviceId}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Filter devices based on selected location
  const filteredDevices = sortBy
    ? devices.filter(device => device.location === sortBy)
    : devices;

  // Get unique locations for filter dropdown
  const uniqueLocations = [...new Set(devices.map(device => device.location))];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  if (loading) return <div className="loading">Loading devices...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className={`device-list-container ${theme}`}>
      {/* Theme Toggle */}
      <div className="theme-toggle-top-right">
        <input
          type="checkbox"
          id="theme-toggle"
          className="theme-checkbox"
          onChange={toggleTheme}
          checked={theme === 'light'}
        />
        <label htmlFor="theme-toggle" className="theme-label">
          <span>
            {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
          </span>
        </label>
      </div>

      <div className="device-list-header">Available Devices</div>

      {/* Sort By Location */}
      <div className="device-sort">
        <label htmlFor="locationSort" className="sort-label">Sort by Location:</label>
        <select 
          id="locationSort" 
          value={sortBy} 
          onChange={handleSortChange}
        >
          <option value="">-- All Devices --</option>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
        {sortBy && (
          <button className="reset-sort-btn" onClick={handleResetSort}>
            Reset
          </button>
        )}
      </div>

      <div className="device-grid">
        {filteredDevices.map(device => (
          <div className="device-card" key={device.id}>
            <div className="device-ip">{device.device_ip}</div>
            <div className="device-id">Device ID: {device.device_id}</div>
            <div className="device-info">Status: {device.status}</div>
            <div className="device-info">Location: {device.location}</div>
            <button 
              className="launch-btn" 
              onClick={() => handleLaunch(device.device_id)}
            >
              Launch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeviceList;