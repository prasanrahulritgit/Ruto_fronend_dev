import React, { useState } from 'react';
import './Audio.css';
import { AudioWaveform, AudioLines } from 'lucide-react';

const Audio = () => {
  const [activeTab, setActiveTab] = useState('streamer');
  const [volume, setVolume] = useState(70);

  const handleStream = () => {
    fetch('/api/start-audio-stream', { method: 'POST' })
      .then(res => res.json())
      .then(data => alert('Streaming started!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="audio-container">
      {/* Tab Switcher */}
      <div className="tabs">
        <button
          className={activeTab === 'streamer' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('streamer')}
        >
          <AudioWaveform size={20} style={{ marginRight: '8px' }} />
          Audio Streamer
        </button>
        <button
          className={activeTab === 'analysis' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('analysis')}
        >
          <AudioLines size={20} style={{ marginRight: '8px' }} />
          Audio Analysis
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'streamer' ? (
        <>
          <div className="header">
            <h2>Audio Streamer</h2>
            <button className="stream-btn" onClick={handleStream}>Start Streaming</button>
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
        </>
      ) : (
        <div className="empty-analysis">
          <h2>Audio Analysis</h2>
          <p>This page is under construction.</p>
        </div>
      )}
    </div>
  );
};

export default Audio;
