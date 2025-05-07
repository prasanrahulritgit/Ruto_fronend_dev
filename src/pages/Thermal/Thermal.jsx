import React, { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, Maximize2, X } from 'lucide-react';
import './Thermal.css';

export default function Thermal() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [image, setImage] = useState(null);
  const [servo, setServo] = useState({ horizontal: 90, vertical: 90 });
  const [activeCamera, setActiveCamera] = useState('ALL');
  const [selectedCamera, setSelectedCamera] = useState('ALL');
  
  // Temperature stats
  const [tempStats, setTempStats] = useState({
    maxTemp: 0,
    minTemp: 0,
    avgTemp: 0,
    centerTemp: 0
  });

  useEffect(() => {
    const videoEl1 = videoRef1.current;
    const videoEl2 = videoRef2.current;
    const videoEl3 = videoRef3.current;

    return () => {
      [videoEl1, videoEl2, videoEl3].forEach(video => {
        if (video?.srcObject) {
          video.srcObject.getTracks().forEach(t => t.stop());
        }
      });
    };
  }, []);

  const startCamera = async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStarted(true);
    } catch (e) {
      console.error('Camera error', e);
    }
  };

  const capture = () => {
    const video = videoRef1.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    setImage(canvas.toDataURL('image/png'));
  };

  const handleServoChange = (axis) => (e) => {
    const val = parseInt(e.target.value, 10);
    setServo(s => ({ ...s, [axis]: val }));
    console.log(`Servo ${axis}: ${val}°`);
  };

  const toggleFullscreen = (cameraIndex) => {
    if (activeCamera === cameraIndex) {
      setActiveCamera('ALL');
      setSelectedCamera('ALL');
    } else {
      setActiveCamera(cameraIndex);
      setSelectedCamera(cameraIndex);
    }
  };

  const closeFullscreen = () => {
    setActiveCamera('ALL');
    setSelectedCamera('ALL');
  };

  const handleDropdownChange = (e) => {
    const selected = e.target.value;
    setSelectedCamera(selected);
    setActiveCamera(selected);
    if (selected !== 'ALL') {
      const videoRef = selected === 'camera-1' ? videoRef1 : selected === 'camera-2' ? videoRef2 : videoRef3;
      startCamera(videoRef);
    }
  };

  return (
    <div className="camera-container">
      <div className="camera-panel">
        <div className="camera-header">
          <h2>Thermal Feed</h2>
          <div className="camera-controls">
            <select
              className="camera-select"
              value={selectedCamera}
              onChange={handleDropdownChange}
            >
              <option value="ALL">ALL</option>
              <option value="camera-1">Camera 1</option>
              <option value="camera-2">Camera 2</option>
              <option value="camera-3">Camera 3</option>
            </select>
            <button className="camera-capture-button" onClick={capture}>
              <CameraIcon size={20} /> Capture
            </button>
          </div>
        </div>

        <div className="camera-feeds">
          {['camera-1', 'camera-2', 'camera-3'].map((camera, index) => {
            if (activeCamera === 'ALL' || activeCamera === camera) {
              return (
                <div
                  className={`camera-feed ${camera} ${activeCamera === camera ? 'fullscreen' : ''}`}
                  key={camera}
                  onClick={() => toggleFullscreen(camera)}
                >
                  <div className="camera-feed-container">
                    {started
                      ? <video ref={videoRef1} autoPlay playsInline className="camera-stream" />
                      : <div className="camera-placeholder">Select Camera to Start</div>}
                    <div className="fullscreen-icon">
                      {activeCamera === camera ? <X size={20} /> : <Maximize2 size={20} />}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {image && (
          <div className="camera-feed">
            <img src={image} alt="captured" className="camera-stream" />
          </div>
        )}
      </div>

      {/* Servo Panel */}
      <div className="servo-panel">
        <h3>Dual Servo Control</h3>

        <div className="servo-control">
          <label>Horizontal: {servo.horizontal}°</label>
          <input
            type="range"
            min="0"
            max="180"
            value={servo.horizontal}
            onChange={handleServoChange('horizontal')}
          />
        </div>

        <div className="servo-control">
          <label>Vertical: {servo.vertical}°</label>
          <input
            type="range"
            min="0"
            max="180"
            value={servo.vertical}
            onChange={handleServoChange('vertical')}
          />
        </div>

      {/* Thermal Analysis Panel Below Servo */}
      <div className="thermal-analysis">
        <h3 className="thermal-analysis-title">Temperature Analysis</h3>

        <div className="thermal-stats">
          <div className="thermal-stat">
            <span>Maximum Temp:</span>
            <span className="thermal-high">{tempStats.maxTemp}°C</span>
          </div>

          <div className="thermal-stat">
            <span>Minimum Temp:</span>
            <span className="thermal-low">{tempStats.minTemp}°C</span>
          </div>

          <div className="thermal-stat">
            <span>Average Temp:</span>
            <span className="thermal-avg">{tempStats.avgTemp}°C</span>
          </div>
          <button className="thermal-export-button">
            Export Thermal Data
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
