import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DeviceList.css';

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
    ip: '100.92.165.6',
    status: 'Available',
    location: 'Austin',
    protocol: 'JTAG/PCIe',
    chipModel: 'b4',
  },
];

function DeviceList() {
  const [devices, setDevices] = useState(initialDevices);
  const [sortBy, setSortBy] = useState('');
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const location = e.target.value;
    setSortBy(location);
    const sorted = [...initialDevices].sort((a, b) => {
      if (location === '') return 0;
      if (a.location === location && b.location !== location) return -1;
      if (a.location !== location && b.location === location) return 1;
      return 0;
    });
    setDevices(sorted);
  };

  const handleLaunch = () => {
    navigate('/videostream'); // or your dashboard landing route
  };

  return (
    <div className="device-list-container">
      <div className="device-list-header">Available Devices</div>

      <div className="device-sort">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">-- Sort by Location --</option>
          <option value="San Jose">San Jose</option>
          <option value="Austin">Austin</option>
        </select>
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

export default DeviceList;
