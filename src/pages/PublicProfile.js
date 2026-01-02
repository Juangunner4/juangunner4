import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProfile } from '../ProfileContext';
import { useTranslation } from 'react-i18next';
import { getProfileBasePath } from '../utils/profileRouting';
import { LocationOn, Link as LinkIcon, CalendarToday, Twitter, Email, Send } from '@mui/icons-material';
import axios from 'axios';
import '../styles/ContentPages.css';

const PublicProfile = () => {
  const { username } = useParams();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
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

  // Show loading state but keep the page layout visible

  return (
    <div className="content-page">
      <div className="page-container">
        {error && (
          <div className="error-message" style={{ padding: '20px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ padding: '20px', marginBottom: '20px', color: '#666' }}>
            Loading profile...
          </div>
        )}

        {!error && profileUser && (
          <>
            {isOwnProfile && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
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
                  {t('profile.editProfileButton')}
                </button>
              </div>
            )}

            <div className="public-profile-container">
              {/* Left Section - Profile Info */}
              <div className="profile-info-section">
                <div className="profile-header">
                  <img
                    src={profileUser.profilePicture || '/default-avatar.png'}
                    alt={profileUser.username}
                    className="profile-avatar"
                    style={{
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid #FF0000',
                      marginBottom: '20px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <h1 style={{ margin: '15px 0 5px 0', fontSize: '28px', fontWeight: '700' }}>
                    {profileUser.username}
                  </h1>
                  <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '14px' }}>
                    {profileUser.isVerified ? t('profile.verifiedUser') : t('profile.memberBadge')}
                  </p>
                </div>

                <div className="profile-details">
                  {profileUser.profile?.bio && (
                    <div className="detail-item">
                      <span className="detail-value">{profileUser.profile.bio}</span>
                    </div>
                  )}

                  {profileUser.profile?.location && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <LocationOn sx={{ fontSize: '18px', color: '#FF0000' }} />
                        <strong>{t('profile.location')}</strong>
                      </div>
                      <span className="detail-value">{profileUser.profile.location}</span>
                    </div>
                  )}

                  {profileUser.profile?.website && (
                    <div className="detail-item">
                      <div className="detail-label">
                        <LinkIcon sx={{ fontSize: '18px', color: '#FF0000' }} />
                        <strong>{t('profile.website')}</strong>
                      </div>
                      <a
                        href={profileUser.profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#FF0000', textDecoration: 'none', fontSize: '14px' }}
                      >
                        {profileUser.profile.website}
                      </a>
                    </div>
                  )}

                  <div className="detail-item">
                    <div className="detail-label">
                      <CalendarToday sx={{ fontSize: '18px', color: '#FF0000' }} />
                      <strong>{t('profile.memberSince')}</strong>
                    </div>
                    <span className="detail-value">{new Date(profileUser.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Social Media Links */}
                  {(profileUser.profile?.social?.twitter || profileUser.profile?.social?.discord || profileUser.profile?.social?.telegram) && (
                    <div style={{ marginTop: '25px', paddingTop: '25px', borderTop: '2px solid #f0f0f0' }}>
                      <h3 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#333', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {t('profile.connect')}
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {profileUser.profile?.social?.twitter && (
                          <a
                            href={`https://x.com/${profileUser.profile.social.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#FF0000',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            <Twitter sx={{ fontSize: '18px' }} />
                            <span>@{profileUser.profile.social.twitter}</span>
                          </a>
                        )}
                        {profileUser.profile?.social?.discord && (
                          <a
                            href={`https://discord.com/users/${profileUser.profile.social.discord}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#FF0000',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            <Email sx={{ fontSize: '18px' }} />
                            <span>{profileUser.profile.social.discord}</span>
                          </a>
                        )}
                        {profileUser.profile?.social?.telegram && (
                          <a
                            href={`https://t.me/${profileUser.profile.social.telegram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              color: '#FF0000',
                              textDecoration: 'none',
                              fontSize: '14px',
                              transition: 'opacity 0.2s'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                            onMouseLeave={(e) => e.target.style.opacity = '1'}
                          >
                            <Send sx={{ fontSize: '18px' }} />
                            <span>@{profileUser.profile.social.telegram}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        .public-profile-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 30px;
          margin-top: 20px;
        }

        .profile-info-section {
          background: white;
          padding: 50px 40px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border: 1px solid #f0f0f0;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .profile-header h1 {
          margin: 0;
        }

        .profile-details {
          display: flex;
          flex-direction: column;
          gap: 25px;
          max-width: 500px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-item:first-child {
          margin-bottom: 15px;
          padding-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }

        .detail-item strong {
          color: #333;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .detail-value {
          color: #555;
          font-size: 15px;
          line-height: 1.6;
          font-weight: 400;
        }

        .detail-item a {
          word-break: break-all;
        }

        .error-message {
          background-color: #fee;
          color: #c33;
          border-radius: 8px;
          border-left: 4px solid #c33;
        }

        @media (max-width: 768px) {
          .public-profile-container {
            grid-template-columns: 1fr;
          }

          .profile-info-section {
            padding: 30px 20px;
          }

          .profile-avatar {
            width: 140px !important;
            height: 140px !important;
          }

          .profile-header h1 {
            font-size: 24px;
          }

          .profile-details {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicProfile;
