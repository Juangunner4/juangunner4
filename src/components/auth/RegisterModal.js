import React, { useState } from 'react';
import Turnstile from '@marsidev/react-turnstile';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.username.length < 3 || formData.username.length > 30) {
      setError('Username must be between 3 and 30 characters');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!turnstileToken) {
      setError('Please complete the verification');
      return;
    }

    setLoading(true);

    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword,
      turnstileToken
    );

    if (result.success) {
      onClose();
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Create Account</h2>
        <p className="auth-modal-subtitle">Join the juangunner4 community</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="johndoe"
              disabled={loading}
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              minLength={8}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
              minLength={8}
            />
          </div>

          <div className="turnstile-container">
            <Turnstile
              siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={setTurnstileToken}
              onError={() => setError('Verification failed')}
              onExpire={() => setTurnstileToken('')}
            />
          </div>

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading || !turnstileToken}
          >
            {loading ? (
              <>
                <span className="auth-loading"></span> Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <button onClick={onSwitchToLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
