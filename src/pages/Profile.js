import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import { useTranslation } from 'react-i18next';
import '../styles/ContentPages.css';
import axios from 'axios';
import * as nsfwjs from 'nsfwjs';

// Validation regex patterns
const VALIDATION_PATTERNS = {
  bio: {
    // Allow letters, numbers, spaces, common punctuation, emojis - max 500 chars
    regex: /^[a-zA-Z0-9\s.,!?'"&()@#*\-\u0080-\uffff]*$/,
    error: 'Bio contains invalid characters. Only letters, numbers, and basic punctuation allowed.',
  },
  location: {
    // Allow letters, numbers, spaces, hyphens, commas
    regex: /^[a-zA-Z0-9\s,-]*$/,
    error: 'Location contains invalid characters. Only letters, numbers, commas, and hyphens allowed.',
  },
  website: {
    // Basic URL validation
    regex: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/,
    error: 'Please enter a valid website URL (e.g., https://example.com)',
  },
  twitter: {
    // Twitter handles: alphanumeric and underscores only, 1-15 chars
    regex: /^[a-zA-Z0-9_]{1,15}$/,
    error: 'Twitter username must be 1-15 characters using only letters, numbers, and underscores.',
  },
  discord: {
    // Discord usernames: alphanumeric, dots, hyphens, underscores, 1-32 chars
    regex: /^[a-zA-Z0-9_.-]{1,32}$/,
    error: 'Discord username must be 1-32 characters using letters, numbers, dots, hyphens, and underscores.',
  },
  telegram: {
    // Telegram handles: alphanumeric and underscores, 5-32 chars
    regex: /^[a-zA-Z0-9_]{5,32}$/,
    error: 'Telegram username must be 5-32 characters using only letters, numbers, and underscores.',
  },
};

// Generic profanity check function
const hasProfanity = (text) => {
  // Check for common offensive patterns and repeated characters (like *****)
  const offensivePatterns = [
    /f[*u]ck/gi,
    /sh[i1]t/gi,
    /a[s$]s/gi,
    /b[i1]tch/gi,
    /c[u0]nt/gi,
    /d[a4]mn/gi,
    /h[e3]ll/gi,
    /p[i1]ss/gi,
    /ass[*-]/gi,
    /\*{5,}/g, // Excessive asterisks
    /cock/gi,
    /whore/gi,
    /slut/gi,
  ];
  
  return offensivePatterns.some(pattern => pattern.test(text));
};

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const basePath = getProfileBasePath(isWeb3);

  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    twitter: '',
    discord: '',
    telegram: '',
    profilePicture: null,
    profilePicturePreview: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`${basePath}/`);
    }
  }, [isAuthenticated, navigate, basePath]);

  // Load user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        bio: user.profile?.bio || '',
        location: user.profile?.location || '',
        website: user.profile?.website || '',
        twitter: user.profile?.social?.twitter || '',
        discord: user.profile?.social?.discord || '',
        telegram: user.profile?.social?.telegram || '',
        profilePicturePreview: user.profilePicture || '/default-avatar.png',
      }));
    }
  }, [user]);

  // Validation function for individual fields
  const validateField = (fieldName, value) => {
    // Skip validation for empty optional fields
    if (!value || value.trim() === '') {
      return { valid: true, error: '' };
    }

    // Check for profanity in all fields
    if (hasProfanity(value)) {
      return { 
        valid: false, 
        error: 'This field contains inappropriate content. Please remove it and try again.' 
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    
    // Strip @ symbol from social media fields
    if (['twitter', 'discord', 'telegram'].includes(name)) {
      value = value.replace(/^@+/, '');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      // Check image content for inappropriate material
      try {
        setError('');
        setMessage('Scanning image for content safety...');
        
        const img = new Image();
        img.onload = async () => {
          try {
            // Load the NSFWJS model
            const model = await nsfwjs.load();
            
            // Predict the image
            const predictions = await model.classify(img);
            
            // Check for explicit content
            // Predictions include: Neutral, Drawing, Hentai, Porn, Sexy
            const explicitPrediction = predictions.find(
              p => p.className === 'Porn' || p.className === 'Hentai' || p.className === 'Sexy'
            );
            
            if (explicitPrediction && explicitPrediction.probability > 0.5) {
              setError('This image contains inappropriate content. Please choose a different image.');
              setMessage('');
              return;
            }

            // Image is safe, process it
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData(prev => ({
                ...prev,
                profilePicture: file,
                profilePicturePreview: reader.result,
              }));
              setMessage('Image uploaded and verified safe!');
              setTimeout(() => setMessage(''), 2000);
            };
            reader.readAsDataURL(file);
          } catch (error) {
            console.error('Image moderation error:', error);
            // If moderation fails, still allow upload but log it
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData(prev => ({
                ...prev,
                profilePicture: file,
                profilePicturePreview: reader.result,
              }));
              setMessage('Image uploaded.');
            };
            reader.readAsDataURL(file);
          }
        };
        img.onerror = () => {
          setError('Could not process image. Please try another.');
          setMessage('');
        };
        img.src = URL.createObjectURL(file);
      } catch (error) {
        console.error('File change error:', error);
        setError('Error processing image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Validate all fields before submission
      const fieldsToValidate = ['bio', 'location', 'website', 'twitter', 'discord', 'telegram'];
      
      for (const field of fieldsToValidate) {
        const validation = validateField(field, formData[field]);
        if (!validation.valid) {
          setError(validation.error);
          setLoading(false);
          return;
        }
      }

      const formDataToSend = new FormData();
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('website', formData.website);
      formDataToSend.append('twitter', formData.twitter);
      formDataToSend.append('discord', formData.discord);
      formDataToSend.append('telegram', formData.telegram);

      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      const response = await axios.put('/api/user/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage(t('profile.profileUpdated'));
        setSaved(true);
        setTimeout(() => {
          setMessage('');
          setSaved(false);
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An error occurred while updating your profile';
      setError(errorMessage);
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content-page">
      <div className="page-container">
        <h1>{t('profile.heading')}</h1>
        <p className="page-description">{t('profile.userProfile')}</p>

        <div className="profile-container">
          <form onSubmit={handleSubmit} className="profile-form">
            {/* Profile Picture */}
            <div className="form-section">
              <h2>{t('profile.profilePicture')}</h2>
              <div className="profile-picture-upload">
                <div className="picture-preview">
                  <img
                    src={formData.profilePicturePreview}
                    alt="Profile preview"
                    className="preview-image"
                  />
                </div>
                <div className="picture-upload-controls">
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="profilePicture" className="file-label">
                    {t('profile.chooseImage')}
                  </label>
                  <p className="file-info">
                    {t('profile.recommendedImage')}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="form-section">
              <label htmlFor="bio">{t('profile.bio')}</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder={t('profile.bioPlaceholder')}
                maxLength={500}
                rows={4}
                className="form-textarea"
              />
              <p className="char-count">
                {t('profile.bioCharCount', { count: formData.bio.length })}
              </p>
            </div>

            {/* Location */}
            <div className="form-section">
              <label htmlFor="location">{t('profile.location')}</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder={t('profile.locationPlaceholder')}
                className="form-input"
              />
            </div>

            {/* Website */}
            <div className="form-section">
              <label htmlFor="website">{t('profile.website')}</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder={t('profile.websitePlaceholder')}
                className="form-input"
              />
            </div>

            {/* Social Media Section */}
            <div className="form-section">
              <h3 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '16px' }}>{t('profile.socialMedia')}</h3>
              
              {/* X / Twitter */}
              <div className="form-section">
                <label htmlFor="twitter">{t('profile.socialMediaTwitter')}</label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder={t('profile.twitterPlaceholder')}
                  className="form-input"
                />
              </div>

              {/* Discord */}
              <div className="form-section">
                <label htmlFor="discord">{t('profile.socialMediaDiscord')}</label>
                <input
                  type="text"
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleInputChange}
                  placeholder={t('profile.discordPlaceholder')}
                  className="form-input"
                />
              </div>

              {/* Telegram */}
              <div className="form-section">
                <label htmlFor="telegram">{t('profile.socialMediaTelegram')}</label>
                <input
                  type="text"
                  id="telegram"
                  name="telegram"
                  value={formData.telegram}
                  onChange={handleInputChange}
                  placeholder={t('profile.telegramPlaceholder')}
                  className="form-input"
                />
              </div>
            </div>

            {/* Messages */}
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            {/* Submit Button */}
            <button
              type="button"
              onClick={saved ? () => navigate(`${basePath}/profile`) : handleSubmit}
              disabled={loading}
              className="submit-btn"
            >
              {loading ? t('profile.saving') : saved ? t('profile.editProfile') : t('profile.saveChanges')}
            </button>
          </form>

          {/* User Info Display */}
          <div className="user-info-section">
            <h2>{t('profile.accountInformation')}</h2>
            <div className="info-item">
              <strong>{t('profile.username')}</strong>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <strong>{t('profile.email')}</strong>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <strong>{t('profile.verified')}</strong>
              <span>{user.isVerified ? t('profile.verifiedBadge') : t('profile.notVerified')}</span>
            </div>
            <div className="info-item">
              <strong>{t('profile.memberSince')}</strong>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-container {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .profile-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .profile-form {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
        }

        .form-section {
          margin-bottom: 25px;
        }

        .form-section label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-family: inherit;
          font-size: 14px;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #FF0000;
          box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
        }

        .char-count {
          font-size: 12px;
          color: #999;
          margin-top: 5px;
        }

        .profile-picture-upload {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .picture-preview {
          flex-shrink: 0;
        }

        .preview-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #FF0000;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .picture-upload-controls {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .file-input {
          display: none;
        }

        .file-label {
          display: inline-block;
          background-color: #FF0000;
          color: white;
          padding: 10px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
          width: fit-content;
        }

        .file-label:hover {
          background-color: #cc0000;
        }

        .file-info {
          font-size: 12px;
          color: #666;
          margin: 0;
        }

        .submit-btn {
          background-color: #FF0000;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
          width: 100%;
          margin-top: 20px;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #cc0000;
        }

        .submit-btn:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        .error-message {
          background-color: #fee;
          color: #c33;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #c33;
        }

        .success-message {
          background-color: #efe;
          color: #3c3;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 15px;
          border-left: 4px solid #3c3;
        }

        .user-info-section {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
          height: fit-content;
        }

        .user-info-section h2 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #333;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }

        .info-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }

        .info-item strong {
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .info-item span {
          color: #333;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Profile;
