import React, { useState } from 'react';
import './Audio.css';

const Audio = () => {
  const [volume, setVolume] = useState(70);

  const handleStream = () => {
    // Replace this with your actual API call
    fetch('/api/start-audio-stream', { method: 'POST' })
      .then(res => res.json())
      .then(data => alert('Streaming started!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="audio-container">
      <div className="header">
        <h2>Audio Analysis</h2>
        <button className="stream-btn" onClick={handleStream}>Start Streaming</button>
        <select className="view-select">
          <option>Standard View</option>
          <option>Advanced View</option>
        </select>
      </div>

      <div className="waveform"></div>

      <div className="monitor">
        <label>🎧 Monitor</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume} 
          onChange={(e) => setVolume(e.target.value)} 
        />
        <span>{volume}%</span>
      </div>

      <div className="device-section">
        <div className="device-box">
          <h3>🎙️ Input Devices</h3>
          <button className="selected">Built-in Microphone</button>
          <button>External Microphone</button>
          <button>Line In</button>
        </div>
        <div className="device-box">
          <h3>🎧 Output Devices</h3>
          <button className="selected">Built-in Speakers</button>
          <button>Headphones</button>
          <button>HDMI Output</button>
        </div>
      </div>
    </div>
  );
};

export default Audio;
