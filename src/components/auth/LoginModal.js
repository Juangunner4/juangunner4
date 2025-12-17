import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Turnstile } from '@marsidev/react-turnstile';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';
import bs58 from 'bs58';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, loginWithWallet } = useAuth();
  const { publicKey, signMessage, connected } = useWallet();
  
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!turnstileToken) {
      setError('Please complete the verification');
      return;
    }

    setLoading(true);

    const result = await login(formData.identifier, formData.password, turnstileToken);

    if (result.success) {
      onClose();
      setFormData({ identifier: '', password: '' });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleWalletLogin = async () => {
    if (!connected || !publicKey || !signMessage) {
      setError('Please connect your Solana wallet first');
      return;
    }

    setError('');
    setWalletLoading(true);

    try {
      // Create a message to sign
      const message = `Sign this message to authenticate with juangunner4.\n\nWallet: ${publicKey.toBase58()}\nTimestamp: ${Date.now()}`;
      const encodedMessage = new TextEncoder().encode(message);
      
      // Request signature from wallet
      const signature = await signMessage(encodedMessage);
      
      // Convert signature to base58
      const signatureBase58 = bs58.encode(signature);

      // Send to backend for verification
      const result = await loginWithWallet(
        publicKey.toBase58(),
        signatureBase58,
        message
      );

      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Wallet login error:', err);
      setError(err.message || 'Failed to sign message');
    }

    setWalletLoading(false);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <h2>Welcome Back</h2>
        <p className="auth-modal-subtitle">Login to your account</p>

        {error && <div className="auth-error">{error}</div>}

        {/* Solana Wallet Login */}
        <div>
          <WalletMultiButton className="wallet-multi-button" />
          {connected && (
            <>
              <p className="wallet-address">
                Connected: {publicKey?.toBase58().slice(0, 4)}...
                {publicKey?.toBase58().slice(-4)}
              </p>
              <button
                className="wallet-connect-btn"
                onClick={handleWalletLogin}
                disabled={walletLoading}
              >
                {walletLoading ? (
                  <>
                    <span className="auth-loading"></span>
                    Signing...
                  </>
                ) : (
                  <>
                    <svg className="wallet-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.88-.78-7-4.97-7-9V8.3l7-3.11 7 3.11V11c0 4.03-3.12 8.22-7 9z"/>
                    </svg>
                    Sign Message to Login
                  </>
                )}
              </button>
            </>
          )}
        </div>

        <div className="auth-divider">OR</div>

        {/* Email/Password Login */}
        <form onSubmit={handleEmailLogin} className="auth-form">
          <div className="auth-form-group">
            <label htmlFor="identifier">Email or Username</label>
            <input
              type="text"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="your@email.com or username"
              disabled={loading}
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="auth-forgot-password">
            <button type="button">Forgot password?</button>
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
                <span className="auth-loading"></span> Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <button onClick={onSwitchToRegister}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchToRegister: PropTypes.func.isRequired
};

export default LoginModal;
