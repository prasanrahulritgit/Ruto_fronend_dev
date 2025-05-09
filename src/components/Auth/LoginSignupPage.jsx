import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/RutoMatrix_Nonbackground.png';
import './LoginSignupPage.css';
import ThreeDModel from './ThreeDModel'; // adjust path as needed
import InfiniteMovingCards from "./InfiniteMovingCards";
import { Sun, Moon } from 'lucide-react';

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
        <ThreeDModel url="/models/Rutomatrix.glb" />
        <InfiniteMovingCards />
        </div>

        {/* Right Panel */}
        <div className={`right-panel ${theme}`}>
          {/* Theme Toggle in Top Right */}
          <div className="theme-toggle-top-right">
            <input
              type="checkbox"
              id="theme-toggle"
              className="theme-checkbox"
              onChange={toggleTheme}
              checked={theme === 'light'}
            />
            <label htmlFor="theme-toggle" className="theme-label">
              <span>
                {theme === 'light' ? <Sun size={20} /> : <Moon size={20}  color= "#1281d6" />}
              </span>
            </label>
          </div>

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
