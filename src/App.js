import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Audio from './pages/Audio';
// Add other page imports here

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Routes>
          <Route path="/audio" element={<Audio />} />
          {/* Add more routes for camera, debugger, etc. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
