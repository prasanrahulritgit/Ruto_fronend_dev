import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/RutoMatrix_Nonbackground.png';
import './LoginSignupPage.css';

export default function LoginSignupPage({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (username === 'Admin' && password === 'Admin') {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        setError('Invalid credentials. Use Admin / Admin');
      }
    } else {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setIsLogin(true);
      setError('');
    }
  };

  return (
    <div className={`login-wrapper ${theme}`}>
      <div className="login-container">
        {/* Left Panel */}
        <div className={`left-panel ${theme}`}>
          {/* Theme Toggle */}
          <div className="theme-toggle-enhanced">
            <input
              type="checkbox"
              id="theme-toggle"
              className="theme-checkbox"
              onChange={toggleTheme}
              checked={theme === 'light'}
            />
            <label htmlFor="theme-toggle" className="theme-label">
              <span className="theme-icon">{theme === 'light' ? '🌞' : '🌙'}</span>
            </label>
          </div>

          <h1>
            Transform Your Experience with <span>Rutomatrix</span>
          </h1>
          <p>
            Discover how Rutomatrix revolutionizes server management with advanced
            remote control and monitoring. Our platform combines state-of-the-art
            hardware and software to deliver unparalleled efficiency and flexibility.
          </p>
          <ul>
            <li>✅ Rutomatrix: Redefining Remote Server Management</li>
            <li>✅ Cross-Platform Serial Driver Compatibility</li>
            <li>✅ Effortless BIOS, Firmware, and OS Flashing</li>
            <li>✅ Advanced UI for Real-time Diagnostics</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className={`right-panel ${theme}`}>
          <img src={logo} alt="Rutomatrix Logo" className="center-logo" />
          <div className={`form-card ${theme}`}>
            <div className="tab-buttons">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
              >
                Sign In
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                className={theme}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className={theme}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isLogin && (
                <input
                  className={theme}
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              {error && <div className="error">{error}</div>}
              <button type="submit" className={`submit-btn ${theme}`}>
                {isLogin ? 'Log In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
