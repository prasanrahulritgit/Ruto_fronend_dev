import React, { useRef, useState, useEffect } from 'react';
import { Camera as CameraIcon, Maximize2, X } from 'lucide-react';
import './Thermal.css';

export default function Thermal() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const canvasRef = useRef(null);
  const [startedCameras, setStartedCameras] = useState({});
  const [image, setImage] = useState(null);
  const [servo, setServo] = useState({ horizontal: 90, vertical: 90 });
  const [activeCamera, setActiveCamera] = useState('ALL');
  const [selectedCamera, setSelectedCamera] = useState('ALL');

  const [tempStats, setTempStats] = useState({
    maxTemp: 0,
    minTemp: 0,
    avgTemp: 0,
    centerTemp: 0
  });

  const cameraAPIMap = {
    'camera-1': 'https://api.example.com/camera-1/',
    'camera-2': 'https://api.example.com/camera-2/',
    'camera-3': 'https://api.example.com/camera-3/'
  };

  useEffect(() => {
    return () => {
      [videoRef1, videoRef2, videoRef3].forEach(videoRef => {
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(t => t.stop());
        }
      });
    };
  }, []);

  const startCamera = async (cameraKey, videoRef) => {
    if (startedCameras[cameraKey]) return; // Prevent duplicate starts
    try {
      videoRef.current.src = cameraAPIMap[cameraKey];
      videoRef.current.load();
      videoRef.current.play();
      setStartedCameras(prev => ({ ...prev, [cameraKey]: true }));
    } catch (e) {
      console.error(`Error loading ${cameraKey}`, e);
    }
  };

  const Start_Api_call = () => {
    ['camera-1', 'camera-2', 'camera-3'].forEach((cameraKey) => {
      const videoRef =
        cameraKey === 'camera-1' ? videoRef1 :
        cameraKey === 'camera-2' ? videoRef2 : videoRef3;
      startCamera(cameraKey, videoRef);
    });
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
      const videoRef =
        cameraIndex === 'camera-1' ? videoRef1 :
        cameraIndex === 'camera-2' ? videoRef2 : videoRef3;

      startCamera(cameraIndex, videoRef);
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
      const videoRef =
        selected === 'camera-1' ? videoRef1 :
        selected === 'camera-2' ? videoRef2 : videoRef3;
      startCamera(selected, videoRef);
    }
  };

  return (
    <div className="thermal-container">
      <div className="thermal-panel">
        <div className="thermal-header">
          <h2>Thermal Feed</h2>
          <button className="thermal-capture-button" onClick={Start_Api_call}>
           Start-Streaming
          </button>
          <div className="thermal-controls">
            <select
              className="thermal-select"
              value={selectedCamera}
              onChange={handleDropdownChange}
            >
              <option value="ALL">ALL</option>
              <option value="camera-1">Camera 1</option>
              <option value="camera-2">Camera 2</option>
              <option value="camera-3">Camera 3</option>
            </select>
            <button className="thermal-capture-button" onClick={capture}>
              <CameraIcon size={20} /> Capture
            </button>
          </div>
        </div>

        <div className={`thermal-feeds ${activeCamera !== 'ALL' ? 'fullscreen-active' : ''}`}>
          {['camera-1', 'camera-2', 'camera-3'].map((camera) => {
            if (activeCamera === 'ALL' || activeCamera === camera) {
              const ref =
                camera === 'camera-1' ? videoRef1 :
                camera === 'camera-2' ? videoRef2 : videoRef3;

              return (
                <div
                  className={`thermal-feed ${camera} ${activeCamera === camera ? 'fullscreen' : ''}`}
                  key={camera}
                  onClick={() => toggleFullscreen(camera)}
                >
                  <div className="thermal-feed-container">
                    {startedCameras[camera] ? (
                      <video ref={ref} controls autoPlay playsInline className="thermal-stream" />
                    ) : (
                      <div className="thermal-placeholder">Click to Start {camera.replace('-', ' ')}</div>
                    )}
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
          <div className="thermal-feed">
            <img src={image} alt="captured" className="thermal-stream" />
          </div>
        )}
      </div>

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
