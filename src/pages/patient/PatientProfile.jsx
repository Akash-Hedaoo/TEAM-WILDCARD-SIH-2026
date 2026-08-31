import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentPatient } from '../../data/dummyData';

export default function PatientProfile() {
  const navigate = useNavigate();
  const [p] = useState(currentPatient);

  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-8">
      <header className="bg-surface shadow-sm sticky top-0 z-40">
        <div className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop h-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
              <Icon name="arrow_back" />
            </button>
            <h1 className="text-headline-md font-bold text-primary">My Profile</h1>
          </div>
          <button className="text-primary text-label-md font-semibold hover:underline">Edit</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 flex flex-col gap-6 animate-fade-in">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center gap-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant shadow-sm">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-container shadow-md">
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h2 className="text-headline-lg-mobile font-bold text-on-surface">{p.name}</h2>
            <p className="text-body-md text-on-surface-variant">{p.age} Yrs • {p.gender}</p>
          </div>
          <div className="bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-lg flex items-center gap-2">
            <Icon name="verified_user" size={18} />
            <span className="text-label-md font-semibold">ABHA: {p.abhaId}</span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4 font-semibold">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: 'badge', label: 'Full Name', value: p.name },
              { icon: 'cake', label: 'Age', value: `${p.age} Years` },
              { icon: 'wc', label: 'Gender', value: p.gender },
              { icon: 'bloodtype', label: 'Blood Group', value: p.bloodGroup },
              { icon: 'phone', label: 'Phone', value: p.phone },
              { icon: 'location_on', label: 'Village', value: p.village },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <Icon name={item.icon} size={16} />
                  <span className="text-label-sm font-medium">{item.label}</span>
                </div>
                <span className="text-body-md text-on-surface font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Info */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4 font-semibold">Medical Information</h3>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-label-sm text-on-surface-variant font-medium">Allergies</span>
              <div className="flex gap-2 mt-1">
                {p.allergies.map((a, i) => (
                  <span key={i} className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-label-sm font-medium">{a}</span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-label-sm text-on-surface-variant font-medium">Conditions</span>
              <div className="flex gap-2 mt-1">
                {p.conditions.map((c, i) => (
                  <span key={i} className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-label-sm font-medium">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4 font-semibold">Emergency Contacts</h3>
          <div className="flex flex-col gap-2">
            {p.emergencyContacts.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div>
                  <p className="text-body-md text-on-surface font-medium">{c.name}</p>
                  <p className="text-body-sm text-on-surface-variant">{c.relation}</p>
                </div>
                <a href={`tel:${c.phone}`} className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center">
                  <Icon name="call" size={20} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Medical History */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
          <h3 className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4 font-semibold">Medical History</h3>
          <div className="flex flex-col gap-2">
            {p.medicalHistory.map((h, i) => (
              <div key={i} className="flex items-start gap-4 p-2 border-b border-surface-container last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-body-md text-on-surface font-medium">{h.event}</p>
                  <p className="text-body-sm text-on-surface-variant">{h.date} • {h.doctor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button onClick={() => navigate('/login')} className="w-full py-4 bg-surface border border-error text-error rounded-xl text-label-md font-semibold flex items-center justify-center gap-2 hover:bg-error-container transition-colors">
          <Icon name="logout" /> Logout
        </button>
      </main>

      <BottomNavBar role="patient" />
    </div>
  );
}
