import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';
import axios from 'axios';
import '../styles/ContentPages.css';

const PublicProfile = () => {
  const { username } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { isWeb3 } = useProfile();
  const navigate = useNavigate();
  const basePath = getProfileBasePath(isWeb3);

  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`/api/user/${username}`);
        
        if (response.data.success) {
          setProfileUser(response.data.user);
          
          // Check if this is the current user's profile
          if (isAuthenticated && currentUser && currentUser.username === username) {
            setIsOwnProfile(true);
          }
        }
      } catch (err) {
        const errorMessage = err.response?.data?.error || 'Failed to load profile';
        setError(errorMessage);
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username, isAuthenticated, currentUser]);

  if (loading) {
    return (
      <div className="content-page">
        <div className="page-container">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-page">
        <div className="page-container">
          <div className="error-message" style={{ padding: '20px', marginTop: '20px' }}>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="content-page">
        <div className="page-container">
          <p>User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-page">
      <div className="page-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1>{profileUser.username}</h1>
            <p className="page-description">
              {profileUser.isVerified ? '✓ Verified User' : 'User Profile'}
            </p>
          </div>
          {isOwnProfile && (
            <button
              onClick={() => navigate(`${basePath}/profile`)}
              style={{
                backgroundColor: '#FF0000',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="public-profile-container">
          {/* Left Section - Profile Info */}
          <div className="profile-info-section">
            <div className="profile-header">
              <img
                src={profileUser.profilePicture || '/default-avatar.png'}
                alt={profileUser.username}
                className="profile-avatar"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid #FF0000',
                  marginBottom: '20px',
                }}
              />
            </div>

            <div className="profile-details">
              <div className="detail-item">
                <strong>Username</strong>
                <span>{profileUser.username}</span>
              </div>

              {profileUser.profile?.bio && (
                <div className="detail-item">
                  <strong>Bio</strong>
                  <span>{profileUser.profile.bio}</span>
                </div>
              )}

              {profileUser.profile?.location && (
                <div className="detail-item">
                  <strong>Location</strong>
                  <span>{profileUser.profile.location}</span>
                </div>
              )}

              {profileUser.profile?.website && (
                <div className="detail-item">
                  <strong>Website</strong>
                  <a
                    href={profileUser.profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#FF0000', textDecoration: 'none' }}
                  >
                    {profileUser.profile.website}
                  </a>
                </div>
              )}

              <div className="detail-item">
                <strong>Member Since</strong>
                <span>{new Date(profileUser.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .public-profile-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          margin-top: 40px;
        }

        .profile-info-section {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          padding-bottom: 15px;
          border-bottom: 1px solid #ddd;
        }

        .detail-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .detail-item strong {
          color: #666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .detail-item span,
        .detail-item a {
          color: #333;
          font-size: 16px;
          line-height: 1.5;
        }

        .error-message {
          background-color: #fee;
          color: #c33;
          border-radius: 4px;
          border-left: 4px solid #c33;
        }

        @media (max-width: 768px) {
          .public-profile-container {
            grid-template-columns: 1fr;
          }

          .profile-info-section {
            padding: 20px;
          }

          .profile-avatar {
            width: 120px !important;
            height: 120px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicProfile;
