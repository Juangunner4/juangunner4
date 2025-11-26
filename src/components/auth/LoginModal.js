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
    email: '',
    password: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);

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

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    if (!turnstileToken) {
      setError('Please complete the verification');
      return;
    }

    setLoading(true);

    const result = await login(formData.email, formData.password, turnstileToken);

    if (result.success) {
      onClose();
      setFormData({ email: '', password: '' });
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
            />
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
