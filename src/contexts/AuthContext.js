import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user profile on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/user/profile');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to load user:', error);
          // Token might be invalid, clear it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Email/Password Login
  const login = useCallback(async (email, password, turnstileToken) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        turnstileToken,
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, error: message };
    }
  }, []);

  // Solana Wallet Login
  const loginWithWallet = useCallback(async (walletAddress, signature, message) => {
    try {
      const response = await axios.post('/api/auth/wallet-login', {
        walletAddress,
        signature,
        message,
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Wallet login failed';
      return { success: false, error: message };
    }
  }, []);

  // Register
  const register = useCallback(async (username, email, password, confirmPassword, turnstileToken) => {
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        confirmPassword,
        turnstileToken,
      });

      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, error: message };
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (updates) => {
    try {
      const response = await axios.put('/api/user/profile', updates);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed';
      return { success: false, error: message };
    }
  }, []);

  // Upload profile picture
  const uploadProfilePicture = useCallback(async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await axios.post('/api/user/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUser(response.data);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Upload failed';
      return { success: false, error: message };
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user,
      login,
      loginWithWallet,
      register,
      logout,
      updateProfile,
      uploadProfilePicture,
    }),
    [user, loading, login, loginWithWallet, register, logout, updateProfile, uploadProfilePicture]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
