import React, { useState } from 'react';
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
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left Panel */}
        <div className="left-panel">
          <h1>Transform Your Experience with <span>Rutomatrix</span></h1>
          <p>
            Discover how Rutomatrix revolutionizes server management with advanced remote control and monitoring.
            Our platform combines state-of-the-art hardware and software to deliver unparalleled efficiency and flexibility.
          </p>
          <ul>
            <li>✅ Rutomatrix: Redefining Remote Server Management</li>
            <li>✅ Cross-Platform Serial Driver Compatibility</li>
            <li>✅ Effortless BIOS, Firmware, and OS Flashing</li>
            <li>✅ Advanced UI for Real-time Diagnostics</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <img src={logo} alt="Rutomatrix Logo" className="center-logo" />
          <div className="form-card">
            <div className="tab-buttons">
              <button
                className={isLogin ? 'active' : ''}
                onClick={() => { setIsLogin(true); setError(''); }}
              >
                Sign In
              </button>
              <button
                className={!isLogin ? 'active' : ''}
                onClick={() => { setIsLogin(false); setError(''); }}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              {error && <div className="error">{error}</div>}
              <button type="submit" className="submit-btn">
                {isLogin ? 'Log In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
