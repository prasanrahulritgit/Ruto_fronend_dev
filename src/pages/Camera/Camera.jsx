import React, { useRef, useState, useEffect } from 'react';
import './Camera.css';

export default function Camera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [image, setImage] = useState(null);
  const [servo, setServo] = useState({ horizontal: 90, vertical: 90 });

  // on mount/unmount: start camera cleanup
  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (videoEl?.srcObject) {
        videoEl.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setStarted(true);
    } catch (e) {
      console.error('Camera error', e);
    }
  };

  const capture = () => {
    const video = videoRef.current;
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
    // TODO: send to backend here
  };

  return (
    <div className="camera-container">
      {/* Left panel: feed & capture */}
      <div className="camera-panel">
        <div className="camera-header">
          <h2>Camera Feed</h2>
          <div className="camera-controls">
            <select className="camera-select" onClick={startCamera}>
              <option>Camera 1</option>
            </select>
            <button className="camera-capture-button" onClick={capture}>
              📸 Capture
            </button>
          </div>
        </div>

        <div className="camera-feed" onClick={!started ? startCamera : undefined}>
          {started
            ? <video ref={videoRef} autoPlay playsInline className="camera-stream" />
            : (
              <div className="camera-placeholder">
                <span>Select a camera to start</span>
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

      {/* Right panel: servo sliders */}
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
