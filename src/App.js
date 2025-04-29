import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Audio from './pages/Audio/Audio';
import Thermal from './pages/Thermal/Thermal';
import Camera from './pages/Camera/Camera';
// Add other page imports here

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Navbar />
          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/audio" element={<Audio />} />
              <Route path="/thermal" element={<Thermal />} />
              <Route path="/camera" element={<Camera />} />
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
