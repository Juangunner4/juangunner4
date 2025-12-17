import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import '../styles/ContentPages.css';
import axios from 'axios';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const { isWeb3 } = useProfile();
  const navigate = useNavigate();
  const basePath = getProfileBasePath(isWeb3);

  const [formData, setFormData] = useState({
    bio: '',
    location: '',
    website: '',
    profilePicture: null,
    profilePicturePreview: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
        profilePicturePreview: user.profilePicture || '/default-avatar.png',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleFileChange = (e) => {
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

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: file,
          profilePicturePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('website', formData.website);

      if (formData.profilePicture) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      const response = await axios.put('/api/user/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setMessage('Profile updated successfully!');
        setTimeout(() => {
          setMessage('');
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
        <h1>User Profile</h1>
        <p className="page-description">Edit your profile information</p>

        <div className="profile-container">
          <form onSubmit={handleSubmit} className="profile-form">
            {/* Profile Picture */}
            <div className="form-section">
              <h2>Profile Picture</h2>
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
                    Choose Image
                  </label>
                  <p className="file-info">
                    Recommended: 500x500px, JPG or PNG, max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="form-section">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                maxLength={500}
                rows={4}
                className="form-textarea"
              />
              <p className="char-count">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Location */}
            <div className="form-section">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                className="form-input"
              />
            </div>

            {/* Website */}
            <div className="form-section">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="form-input"
              />
            </div>

            {/* Messages */}
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="submit-btn"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {/* User Info Display */}
          <div className="user-info-section">
            <h2>Account Information</h2>
            <div className="info-item">
              <strong>Username:</strong>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <strong>Verified:</strong>
              <span>{user.isVerified ? '✓ Verified' : '✗ Not Verified'}</span>
            </div>
            <div className="info-item">
              <strong>Member Since:</strong>
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
