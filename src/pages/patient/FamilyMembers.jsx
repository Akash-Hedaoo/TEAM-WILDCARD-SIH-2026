import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { familyMembers } from '../../data/dummyData';

export default function FamilyMembers() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>Family Members</h1>
        <button className="btn btn--primary btn--sm"><Icon name="person_add" size={18} /> Add</button>
      </header>

      <div className="container container--narrow animate-fade-in">
        <div className="flex flex-col gap-3">
          {familyMembers.map((member) => (
            <div key={member.id} className="card flex items-center gap-4" style={{ padding: 'var(--sp-4)' }}>
              <div className={`avatar avatar--lg avatar--initials ${member.triageLevel ? `avatar--${member.triageLevel}` : 'avatar--primary'}`}>
                {member.name.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="text-body-md font-bold">{member.name}</h3>
                <p className="text-body-sm text-muted">{member.relation} • {member.age} Yrs • {member.gender}</p>
                <p className="text-label-sm text-muted mt-1" style={{ fontFamily: 'monospace' }}>{member.abhaId}</p>
              </div>
              <Icon name="chevron_right" style={{ color: 'var(--on-surface-variant)' }} />
            </div>
          ))}
        </div>
      </div>
      <BottomNavBar role="patient" />
    </div>
  );
}
