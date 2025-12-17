const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { turnstileMiddleware } = require('../middleware/turnstile');
const crypto = require('crypto');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', turnstileMiddleware, async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    console.log('Registration attempt:', { username, email });

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: 'Username must be between 3 and 30 characters' });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return res.status(400).json({ error: 'Username can only contain letters, numbers, and underscores' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username }]
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already taken' });
      }
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
      verificationToken
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // TODO: Send verification email
    console.log(`Verification token for ${email}: ${verificationToken}`);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route   POST /api/auth/login
// @desc    Login user with email or username
// @access  Public
router.post('/login', turnstileMiddleware, async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Please provide email/username and password' });
    }

    // Find user by email or username (case-insensitive for both)
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: new RegExp(`^${identifier}$`, 'i') }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login. Please try again later.' });
  }
});

// @route   POST /api/auth/verify-email
// @desc    Verify user email
// @access  Public
router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Verification token is required' });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Server error during email verification' });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Please provide email address' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists
      return res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // TODO: Send password reset email
    console.log(`Reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent.'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error processing password reset request' });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error during password reset' });
  }
});

// @route   POST /api/auth/wallet-login
// @desc    Login/register with Solana wallet
// @access  Public
router.post('/wallet-login', async (req, res) => {
  try {
    const { walletAddress, signature, message } = req.body;

    // Validation
    if (!walletAddress || !signature || !message) {
      return res.status(400).json({ error: 'Wallet address, signature, and message are required' });
    }

    // Verify the signature using Solana web3.js
    const nacl = require('tweetnacl');
    const bs58 = require('bs58');
    const { PublicKey } = require('@solana/web3.js');

    try {
      // Decode the signature and message
      const signatureUint8 = bs58.decode(signature);
      const messageUint8 = new TextEncoder().encode(message);
      const publicKeyUint8 = new PublicKey(walletAddress).toBytes();

      // Verify the signature
      const verified = nacl.sign.detached.verify(
        messageUint8,
        signatureUint8,
        publicKeyUint8
      );

      if (!verified) {
        return res.status(401).json({ error: 'Invalid signature' });
      }

      // Check if the message is recent (within 5 minutes)
      const timestampMatch = message.match(/Timestamp: (\d+)/);
      if (timestampMatch) {
        const timestamp = parseInt(timestampMatch[1]);
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        if (now - timestamp > fiveMinutes) {
          return res.status(401).json({ error: 'Message has expired. Please try again.' });
        }
      }

      // Find or create user with this wallet address
      let user = await User.findOne({ walletAddress });

      if (!user) {
        // Create new user with wallet
        const username = `user_${walletAddress.slice(0, 8)}`;
        user = new User({
          username,
          walletAddress,
          email: `${walletAddress}@wallet.placeholder`, // Placeholder email
          password: crypto.randomBytes(32).toString('hex'), // Random password (won't be used)
          isVerified: true, // Auto-verify wallet users
        });

        await user.save();
      }

      // Generate JWT token
      const token = generateToken(user._id);

      res.json({
        message: 'Wallet login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email !== `${walletAddress}@wallet.placeholder` ? user.email : null,
          walletAddress: user.walletAddress,
          profilePicture: user.profilePicture,
          isVerified: user.isVerified,
        },
      });
    } catch (verifyError) {
      console.error('Signature verification error:', verifyError);
      return res.status(401).json({ error: 'Invalid signature or wallet address' });
    }
  } catch (error) {
    console.error('Wallet login error:', error);
    res.status(500).json({ error: 'Server error during wallet login' });
  }
});

module.exports = router;
