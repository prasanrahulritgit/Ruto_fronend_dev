import { useState, useEffect, useRef } from 'react';
import './Thermal.css';

const Thermal = () => {
  // Thermal visualization state
  const [thermalData, setThermalData] = useState([]);
  const [minTemp, setMinTemp] = useState(20);
  const [maxTemp, setMaxTemp] = useState(40);
  const [resolution] = useState({ x: 32, y: 32 });
  const animationRef = useRef(null);
  
  // Temperature analysis state
  const [tempStats, setTempStats] = useState({
    maxTemp: 38.7,
    minTemp: 22.3,
    avgTemp: 29.8,
    centerTemp: 32.1
  });

  // Thermal colors for visualization
  const thermalColors = [
    '#000080', // Dark blue (coldest)
    '#0000FF', // Blue
    '#00FFFF', // Cyan
    '#00FF00', // Green
    '#FFFF00', // Yellow
    '#FF8000', // Orange
    '#FF0000', // Red
    '#800000'  // Dark red (hottest)
  ];

  // Generate simulated thermal data
  useEffect(() => {
    const generateThermalData = () => {
      const newData = [];
      const centerX = resolution.x / 2;
      const centerY = resolution.y / 2;
      
      let max = -Infinity;
      let min = Infinity;
      let sum = 0;
      
      for (let y = 0; y < resolution.y; y++) {
        const row = [];
        for (let x = 0; x < resolution.x; x++) {
          const distX = (x - centerX) / centerX;
          const distY = (y - centerY) / centerY;
          const distance = Math.sqrt(distX * distX + distY * distY);
          
          const normalizedTemp = 1 - Math.min(1, distance * 1.2);
          const noise = Math.random() * 0.1 - 0.05;
          const value = normalizedTemp + noise;
          const temp = minTemp + value * (maxTemp - minTemp);
          
          row.push(temp);
          
          // Update stats
          if (temp > max) max = temp;
          if (temp < min) min = temp;
          sum += temp;
        }
        newData.push(row);
      }
      
      // Calculate center temperature
      const centerTemp = newData[Math.floor(resolution.y/2)][Math.floor(resolution.x/2)];
      
      setThermalData(newData);
      setTempStats({
        maxTemp: parseFloat(max.toFixed(1)),
        minTemp: parseFloat(min.toFixed(1)),
        avgTemp: parseFloat((sum / (resolution.x * resolution.y)).toFixed(1)),
        centerTemp: parseFloat(centerTemp.toFixed(1))
      });
      
      animationRef.current = requestAnimationFrame(generateThermalData);
    };
    
    generateThermalData();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [resolution, minTemp, maxTemp]);
  
  // Get color for a temperature value
  const getColorForTemperature = (temp) => {
    const normalizedTemp = (temp - minTemp) / (maxTemp - minTemp);
    const colorIndex = Math.min(Math.floor(normalizedTemp * thermalColors.length), thermalColors.length - 1);
    return thermalColors[colorIndex];
  };

  return (
    <div className="thermal-container">
      {/* Main Thermal Visualization */}
      <div className="thermal-visualization">
        <div className="thermal-header">
          <h2>Thermal Visualization</h2>
          <div className="thermal-controls">
            <button className="thermal-button">Capture</button>
            <button className="thermal-button">Export</button>
          </div>
        </div>
        
        <div className="thermal-display">
          <div 
            className="thermal-grid"
            style={{
              gridTemplateColumns: `repeat(${resolution.x}, 1fr)`,
              gridTemplateRows: `repeat(${resolution.y}, 1fr)`
            }}
          >
            {thermalData.flatMap((row, y) => 
              row.map((temp, x) => (
                <div
                  key={`${x}-${y}`}
                  className="thermal-pixel"
                  style={{ backgroundColor: getColorForTemperature(temp) }}
                />
              ))
            )}
          </div>
          
          {/* Temperature Scale */}
          <div className="thermal-scale">
            <div className="thermal-scale-colors">
              {thermalColors.map((color, index) => (
                <div 
                  key={index}
                  className="thermal-scale-color"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="thermal-scale-labels">
              <span>{maxTemp}°C</span>
              <span>{minTemp}°C</span>
            </div>
          </div>
        </div>
        
        {/* Temperature Controls */}
        <div className="thermal-control-panel">
          <div className="thermal-range-control">
            <label>Min Temp (°C)</label>
            <input
              type="range"
              min="0"
              max="30"
              value={minTemp}
              onChange={(e) => setMinTemp(parseFloat(e.target.value))}
              className="thermal-slider"
            />
            <span>{minTemp}</span>
          </div>
          
          <div className="thermal-range-control">
            <label>Max Temp (°C)</label>
            <input
              type="range"
              min="30"
              max="100"
              value={maxTemp}
              onChange={(e) => setMaxTemp(parseFloat(e.target.value))}
              className="thermal-slider"
            />
            <span>{maxTemp}</span>
          </div>
          
          <button className="thermal-advanced-button">
            Advanced Settings
          </button>
        </div>
      </div>
      
      {/* Temperature Analysis */}
      <div className="thermal-analysis">
        <h3 className="thermal-analysis-title">
          Temperature Analysis
        </h3>
        
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
          
          <div className="thermal-stat">
            <span>Center Point:</span>
            <span className="thermal-center">{tempStats.centerTemp}°C</span>
          </div>
          
          <button className="thermal-export-button">
            Export Thermal Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Thermal;