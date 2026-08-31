import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import SideNavBar from '../../components/shared/SideNavBar';
import Icon from '../../components/shared/Icon';
import { useAppContext } from '../../context/useAppContext';

/**
 * ProfilePage - Generic profile page for all user roles
 * Shows user information, settings, and account options
 */
export default function ProfilePage() {
  const navigate = useNavigate();
  const { currentUserData, logout, role } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(currentUserData || {});

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleUpdateProfile = () => {
    setIsEditing(false);
    // In a real app, this would call an API
  };

  if (!currentUserData) {
    return (
      <div className="page-shell">
        <header className="header">
          <button className="btn--icon" onClick={() => navigate(-1)}>
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-primary">Profile</h1>
        </header>
        <div className="container">
          <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
            <Icon name="account_circle" style={{ fontSize: '48px', color: 'var(--on-surface-variant)', opacity: 0.5, marginBottom: 'var(--sp-4)' }} />
            <p className="text-body-md text-muted mb-4">Please log in to view your profile.</p>
            <button className="btn btn--primary" onClick={() => navigate('/login')}>
              <Icon name="login" size={18} /> Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell" style={{ paddingBottom: role !== 'patient' ? 0 : 'var(--sp-4)' }}>
      {role !== 'patient' && <SideNavBar role={role} avatar={currentUserData?.avatar} />}

      <header className="header" style={{ display: 'flex' }}>
        <button className="btn--icon" onClick={() => navigate(-1)}>
          <Icon name="arrow_back" />
        </button>
        <h1 className="text-headline-md font-bold text-primary" style={{ flex: 1, marginLeft: 'var(--sp-2)' }}>Profile</h1>
        <button className="btn--icon" onClick={() => setIsEditing(!isEditing)}>
          <Icon name="edit" />
        </button>
      </header>

      <div className="container animate-fade-in">
        {/* Profile Header */}
        <div className="card mb-4" style={{ textAlign: 'center', padding: 'var(--sp-6)' }}>
          <div className="avatar avatar--xl" style={{ margin: '0 auto var(--sp-4)' }}>
            <img src={currentUserData.avatar} alt={currentUserData.name} />
          </div>
          <h2 className="text-headline-lg font-bold">{currentUserData.name}</h2>
          <p className="text-body-md text-muted mt-2">{currentUserData.role || role}</p>
          {currentUserData.specialty && (
            <p className="text-body-sm text-muted">{currentUserData.specialty}</p>
          )}
        </div>

        {/* Profile Information */}
        <div className="card mb-4">
          <h3 className="section-label mb-4">Personal Information</h3>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {[
              { label: 'Full Name', key: 'name' },
              { label: 'ID', key: 'id' },
              { label: 'Phone', key: 'phone' },
              { label: 'Email', key: 'email' },
              { label: 'Age', key: 'age' },
              { label: 'Gender', key: 'gender' },
            ].map((field, i) => (
              <div key={i}>
                <span className="text-label-sm text-muted">{field.label}</span>
                {isEditing ? (
                  <input
                    type="text"
                    className="input mt-2"
                    value={profileData[field.key] || ''}
                    onChange={(e) =>
                      setProfileData({ ...profileData, [field.key]: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-body-md font-semibold mt-1">
                    {profileData[field.key] || '—'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Location Information (if applicable) */}
        {(currentUserData.zone || currentUserData.village || currentUserData.district) && (
          <div className="card mb-4">
            <h3 className="section-label mb-4">Location Information</h3>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {[
                { label: 'Zone/Region', key: 'zone' },
                { label: 'District', key: 'district' },
                { label: 'Village', key: 'village' },
                { label: 'Block', key: 'block' },
              ].map((field, i) => (
                <div key={i}>
                  <span className="text-label-sm text-muted">{field.label}</span>
                  <p className="text-body-md font-semibold mt-1">
                    {profileData[field.key] || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medical Information (if applicable) */}
        {(currentUserData.bloodGroup || currentUserData.abhaId || currentUserData.conditions) && (
          <div className="card mb-4">
            <h3 className="section-label mb-4">Medical Information</h3>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {currentUserData.bloodGroup && (
                <div>
                  <span className="text-label-sm text-muted">Blood Group</span>
                  <p className="text-body-md font-semibold mt-1">{currentUserData.bloodGroup}</p>
                </div>
              )}
              {currentUserData.abhaId && (
                <div>
                  <span className="text-label-sm text-muted">ABHA ID</span>
                  <p className="text-body-md font-semibold mt-1">{currentUserData.abhaId}</p>
                </div>
              )}
              {currentUserData.conditions && currentUserData.conditions.length > 0 && (
                <div>
                  <span className="text-label-sm text-muted">Conditions</span>
                  <div className="mt-2">
                    {currentUserData.conditions.map((cond, i) => (
                      <span key={i} className="badge badge--warning" style={{ marginRight: 'var(--sp-2)' }}>
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Professional Information (for Doctors/ASHA) */}
        {(currentUserData.credentials || currentUserData.regNo) && (
          <div className="card mb-4">
            <h3 className="section-label mb-4">Professional Information</h3>
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {currentUserData.credentials && (
                <div>
                  <span className="text-label-sm text-muted">Credentials</span>
                  <p className="text-body-md font-semibold mt-1">{currentUserData.credentials}</p>
                </div>
              )}
              {currentUserData.regNo && (
                <div>
                  <span className="text-label-sm text-muted">Registration No.</span>
                  <p className="text-body-md font-semibold mt-1">{currentUserData.regNo}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emergency Contacts (for Patients) */}
        {currentUserData.emergencyContacts && currentUserData.emergencyContacts.length > 0 && (
          <div className="card mb-4">
            <h3 className="section-label mb-4">Emergency Contacts</h3>
            {currentUserData.emergencyContacts.map((contact, i) => (
              <div key={i} className="flex justify-between items-start pb-3" style={{ borderBottom: i < currentUserData.emergencyContacts.length - 1 ? '1px solid var(--outline-variant)' : 'none' }}>
                <div>
                  <p className="text-body-md font-semibold">{contact.name}</p>
                  <p className="text-body-sm text-muted">{contact.relation}</p>
                </div>
                <p className="text-body-sm font-mono">{contact.phone}</p>
              </div>
            ))}
          </div>
        )}

        {/* Account Settings */}
        <div className="card mb-4">
          <h3 className="section-label mb-4">Account Settings</h3>
          <div className="flex flex-col gap-3">
            <button className="btn btn--outline" style={{ justifyContent: 'flex-start' }}>
              <Icon name="security" size={20} style={{ marginRight: 'var(--sp-3)' }} />
              Change Password
            </button>
            <button className="btn btn--outline" style={{ justifyContent: 'flex-start' }}>
              <Icon name="notifications" size={20} style={{ marginRight: 'var(--sp-3)' }} />
              Notification Preferences
            </button>
            <button className="btn btn--outline" style={{ justifyContent: 'flex-start' }}>
              <Icon name="language" size={20} style={{ marginRight: 'var(--sp-3)' }} />
              Language & Region
            </button>
          </div>
        </div>

        {/* Save/Logout */}
        <div className="flex gap-3" style={{ flexWrap: 'wrap', marginBottom: 'var(--sp-4)' }}>
          {isEditing && (
            <>
              <button className="btn btn--ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn btn--primary" onClick={handleUpdateProfile}>
                Save Changes
              </button>
            </>
          )}
          <button className="btn btn--error" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
            <Icon name="logout" size={18} /> Logout
          </button>
        </div>
      </div>

      {role && <BottomNavBar role={role} />}
    </div>
  );
}
