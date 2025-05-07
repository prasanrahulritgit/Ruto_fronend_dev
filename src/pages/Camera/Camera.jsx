import React, { useRef, useState, useEffect } from 'react';
import {
  Camera as CameraIcon,
  Maximize2,
  X
} from 'lucide-react';
import './Camera.css';

export default function Camera() {
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [image, setImage] = useState(null);
  const [servo, setServo] = useState({ horizontal: 90, vertical: 90 });
  const [activeCamera, setActiveCamera] = useState('ALL');
  const [selectedCamera, setSelectedCamera] = useState('ALL');

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
          <h2>Camera Feed</h2>
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
          {(activeCamera === 'ALL' || activeCamera === 'camera-1') && (
            <div
              className={`camera-feed camera-1 ${activeCamera === 'camera-1' ? 'fullscreen' : ''}`}
              onClick={() => toggleFullscreen('camera-1')}
            >
              <div className="camera-feed-container">
                {started
                  ? <video ref={videoRef1} autoPlay playsInline className="camera-stream" />
                  : <div className="camera-placeholder">Select Camera to Start</div>}
                <div className="fullscreen-icon">
                  {activeCamera === 'camera-1' ? <X size={20} /> : <Maximize2 size={20} />}
                </div>
              </div>
            </div>
          )}

          {(activeCamera === 'ALL' || activeCamera === 'camera-2') && (
            <div
              className={`camera-feed camera-2 ${activeCamera === 'camera-2' ? 'fullscreen' : ''}`}
              onClick={() => toggleFullscreen('camera-2')}
            >
              <div className="camera-feed-container">
                {started
                  ? <video ref={videoRef2} autoPlay playsInline className="camera-stream" />
                  : <div className="camera-placeholder">Select Camera to Start</div>}
                <div className="fullscreen-icon">
                  {activeCamera === 'camera-2' ? <X size={20} /> : <Maximize2 size={20} />}
                </div>
              </div>
            </div>
          )}

          {(activeCamera === 'ALL' || activeCamera === 'camera-3') && (
            <div
              className={`camera-feed camera-3 ${activeCamera === 'camera-3' ? 'fullscreen' : ''}`}
              onClick={() => toggleFullscreen('camera-3')}
            >
              <div className="camera-feed-container">
                {started
                  ? <video ref={videoRef3} autoPlay playsInline className="camera-stream" />
                  : <div className="camera-placeholder">Select Camera to Start</div>}
                <div className="fullscreen-icon">
                  {activeCamera === 'camera-3' ? <X size={20} /> : <Maximize2 size={20} />}
                </div>
              </div>
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {image && (
          <div className="camera-feed">
            <img src={image} alt="captured" className="camera-stream" />
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
      </div>
    </div>
  );
}
