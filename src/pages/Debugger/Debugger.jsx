import React from 'react';
import { CircleDot, Camera } from 'lucide-react';
import { SiArduino } from 'react-icons/si';
import './Debugger.css';
 
const Debugger = () => {
  const handleArduinoClick = async () => {
    try {
      const res = await fetch('http://100.69.116.101:7417/launch_arduino');
      const data = await res.json();
 
      if (data.success === true) {
        // On success, reload the page to load the stream
        window.location.reload();
      } else {
        alert('Failed to launch Arduino.');
        console.error('API response:', data);
      }
    } catch (err) {
      alert('connecting to Arduino API.');
      console.error(err);
    }
  };
 
  const handleSTM32Click = () => {
    alert('STM32 support will be added soon.');
  };
 
  return (
<>
<div className="debugger-header">
<h2>Debugger</h2>
<div>
<button className="record" onClick={handleArduinoClick}>
<SiArduino size={18} style={{ marginRight: '5px', color: '#00979D' }} />
            Arduino Uno
</button>
<button className="capture" onClick={handleSTM32Click}>
<Camera size={16} style={{ marginRight: '5px' }} />
            STM32F
</button>
</div>
</div>
 
      <div style={{ height: '100vh', width: '100%' }}>
<iframe
          src="http://100.69.116.101:7417/"
          title="Debugger Stream"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
</div>
</>
  );
};
 
export default Debugger;