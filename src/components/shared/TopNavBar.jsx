import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function TopNavBar({ role = 'patient', avatar }) {
  const navigate = useNavigate();

  return (
    <header className="header hide-mobile" style={{ display: 'none' }}>
      <style>{`@media (min-width: 768px) { .top-nav-show { display: flex !important; } }`}</style>
      <div className="header top-nav-show" style={{ display: 'none', width: '100%', maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', height: '100%', alignItems: 'center', border: 'none', boxShadow: 'none', background: 'transparent' }}>
        <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <Icon name="local_hospital" fill />
          <span>Rural Health Commons</span>
        </div>

        <div className="header-actions">
          <button className="btn--icon" onClick={() => navigate('/notifications')} style={{ position: 'relative' }}>
            <Icon name="notifications" />
            <span className="notif-dot" />
          </button>
          {avatar && (
            <div className="avatar avatar--sm" onClick={() => navigate(`/${role}/profile`)}>
              <img src={avatar} alt="Profile" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
