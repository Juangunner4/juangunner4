const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Image content moderation helper
const validateImageContent = async (filePath) => {
  try {
    // Note: For production, integrate with a service like:
    // - AWS Rekognition
    // - Google Vision API
    // - Cloudinary API
    // - Azure Computer Vision
    // This is a placeholder structure for future implementation
    
    // Basic file validation
    if (!fs.existsSync(filePath)) {
      return { valid: false, error: 'Image file not found' };
    }
    
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      return { valid: false, error: 'Image file is empty' };
    }
    
    return { valid: true, error: '' };
  } catch (error) {
    console.error('Image validation error:', error);
    // If validation fails, reject the upload for safety
    return { valid: false, error: 'Unable to validate image. Please try again.' };
  }
};

// Backend validation patterns - mirror frontend for consistency
const VALIDATION_PATTERNS = {
  bio: {
    regex: /^[a-zA-Z0-9\s\.\,\!\?\'\"\-\&\(\)\@\#\*\u0080-\uffff]*$/,
    error: 'Bio contains invalid characters',
  },
  location: {
    regex: /^[a-zA-Z0-9\s\,\-]*$/,
    error: 'Location contains invalid characters',
  },
  website: {
    regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    error: 'Invalid website URL format',
  },
  twitter: {
    regex: /^[a-zA-Z0-9_]{1,15}$/,
    error: 'Invalid Twitter username format',
  },
  discord: {
    regex: /^[a-zA-Z0-9_\.\-]{1,32}$/,
    error: 'Invalid Discord username format',
  },
  telegram: {
    regex: /^[a-zA-Z0-9_]{5,32}$/,
    error: 'Invalid Telegram username format',
  },
};

// Profanity check function
const hasProfanity = (text) => {
  const offensivePatterns = [
    /f[\*u]ck/gi,
    /sh[i1]t/gi,
    /a[s\$]s/gi,
    /b[i1]tch/gi,
    /c[u0]nt/gi,
    /d[a4]mn/gi,
    /h[e3]ll/gi,
    /p[i1]ss/gi,
    /ass[\*\-]/gi,
    /\*{5,}/g,
    /cock/gi,
    /whore/gi,
    /slut/gi,
  ];
  
  return offensivePatterns.some(pattern => pattern.test(text));
};

// Field validation function
const validateField = (fieldName, value) => {
  // Skip validation for empty optional fields
  if (!value || value.trim() === '') {
    return { valid: true, error: '' };
  }

  // Check for profanity
  if (hasProfanity(value)) {
    return { 
      valid: false, 
      error: 'Field contains inappropriate content' 
    };
  }

  // Validate field-specific patterns
  if (VALIDATION_PATTERNS[fieldName]) {
    const pattern = VALIDATION_PATTERNS[fieldName];
    if (!pattern.regex.test(value)) {
      return { valid: false, error: pattern.error };
    }
  }

  return { valid: true, error: '' };
};

// Configure multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/avatars/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
    }
  }
});

// @route   GET /api/user/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error fetching profile' });
  }
});

// @route   GET /api/user/:username
// @desc    Get public user profile by username
// @access  Public
router.get('/:username', async (req, res) => {
  try {
    console.log('Fetching public profile for username:', req.params.username);
    // Case-insensitive username lookup
    const user = await User.findOne({ username: new RegExp(`^${req.params.username}$`, 'i') });

    console.log('Found user:', user ? user.username : 'Not found');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return only public profile information
    res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        profile: user.profile,
        createdAt: user.createdAt,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error('Get public profile error:', error);
    res.status(500).json({ error: 'Server error fetching user profile' });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const { bio, location, website, newsletter, profileType, twitter, discord, telegram } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate all fields before updating
    const fieldsToValidate = {
      bio,
      location,
      website,
      twitter,
      discord,
      telegram,
    };

    for (const [fieldName, value] of Object.entries(fieldsToValidate)) {
      const validation = validateField(fieldName, value);
      if (!validation.valid) {
        return res.status(400).json({ error: validation.error });
      }
    }

    // Update profile fields
    if (bio !== undefined) user.profile.bio = bio;
    if (location !== undefined) user.profile.location = location;
    if (website !== undefined) user.profile.website = website;

    // Update social media fields (strip @ symbols)
    if (twitter !== undefined) user.profile.social.twitter = twitter.replace(/^@+/, '');
    if (discord !== undefined) user.profile.social.discord = discord.replace(/^@+/, '');
    if (telegram !== undefined) user.profile.social.telegram = telegram.replace(/^@+/, '');

    // Update profile picture if provided
    if (req.file) {
      // Validate image content before storing
      const imageValidation = await validateImageContent(req.file.path);
      if (!imageValidation.valid) {
        // Delete the uploaded file if validation fails
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting invalid image:', err);
        });
        return res.status(400).json({ error: imageValidation.error });
      }
      
      user.profilePicture = `/uploads/avatars/${req.file.filename}`;
    }

    // Update preferences
    if (newsletter !== undefined) user.preferences.newsletter = newsletter;
    if (profileType !== undefined && ['web2', 'web3'].includes(profileType)) {
      user.preferences.profileType = profileType;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// @route   POST /api/user/profile-picture
// @desc    Upload profile picture
// @access  Private
router.post('/profile-picture', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload an image file' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate image content before storing
    const imageValidation = await validateImageContent(req.file.path);
    if (!imageValidation.valid) {
      // Delete the uploaded file if validation fails
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting invalid image:', err);
      });
      return res.status(400).json({ error: imageValidation.error });
    }

    // Update profile picture path
    user.profilePicture = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      success: true,
      message: 'Profile picture updated successfully',
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({ error: 'Server error uploading profile picture' });
  }
});

// @route   PUT /api/user/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Server error changing password' });
  }
});

// @route   DELETE /api/user/account
// @desc    Delete user account
// @access  Private
router.delete('/account', authMiddleware, async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Please provide your password to confirm deletion' });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({ error: 'Server error deleting account' });
  }
});

module.exports = router;
