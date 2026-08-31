import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { familyMembers } from '../../data/dummyData';

export default function FamilyMembers() {
  const navigate = useNavigate();
  const triageColors = { red: 'bg-error', yellow: 'bg-tertiary-container', green: 'bg-secondary' };

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-8">
      <header className="bg-surface shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-container-margin-mobile h-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-primary">Family Members</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 flex flex-col gap-6 animate-fade-in">
        <p className="text-body-md text-on-surface-variant">Manage your family members and dependents. Link their ABHA IDs to manage health records together.</p>

        {familyMembers.map((m) => (
          <div key={m.id} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-headline-md">
                {m.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-body-lg font-semibold text-on-surface">{m.name}</h3>
                  {m.triageLevel && <span className={`w-3 h-3 rounded-full ${triageColors[m.triageLevel]}`}></span>}
                </div>
                <p className="text-body-sm text-on-surface-variant">{m.relation} • {m.age} Yrs • {m.gender}</p>
                <p className="text-label-sm text-on-surface-variant mt-1 flex items-center gap-1">
                  <Icon name="verified_user" size={14} /> {m.abhaId}
                </p>
              </div>
            </div>
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="chevron_right" />
            </button>
          </div>
        ))}

        {/* Add Member */}
        <button className="w-full py-6 bg-surface-container-lowest rounded-xl border-2 border-dashed border-primary text-primary flex flex-col items-center justify-center gap-2 hover:bg-primary-fixed/10 transition-colors">
          <Icon name="person_add" className="text-3xl" />
          <span className="text-label-md font-semibold">Add Family Member</span>
          <span className="text-body-sm text-on-surface-variant">Link ABHA ID to manage records</span>
        </button>
      </main>

      <BottomNavBar role="patient" />
    </div>
  );
}
