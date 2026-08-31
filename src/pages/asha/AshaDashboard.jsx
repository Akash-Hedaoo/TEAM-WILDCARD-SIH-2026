import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { currentAshaWorker, patients } from '../../data/dummyData';

export default function AshaDashboard() {
  const navigate = useNavigate();
  const asha = currentAshaWorker;
  const roster = patients.slice(0, 5);

  const triageBadge = {
    red: { bg: 'bg-error-container', text: 'text-on-error-container', icon: 'priority_high' },
    yellow: { bg: 'bg-tertiary-fixed-dim', text: 'text-on-tertiary-container', icon: 'visibility' },
    green: { bg: 'bg-secondary-container', text: 'text-on-secondary-container', icon: 'check_circle' },
  };

  return (
    <div className="bg-background text-on-background min-h-screen pt-16 pb-24">
      {/* TopNavBar */}
      <header className="fixed top-0 z-40 bg-surface shadow-sm flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop h-16">
        <span className="text-headline-md font-bold text-primary">Rural Health Commons</span>
        <div className="flex items-center gap-4">
          <button className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary active:scale-95 transition-all">
            <Icon name="sync" />
          </button>
          <button onClick={() => navigate('/notifications')} className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary active:scale-95 transition-all hidden sm:flex">
            <Icon name="notifications" />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full text-on-surface-variant hover:text-primary active:scale-95 transition-all">
            <Icon name="account_circle" />
          </button>
        </div>
      </header>

      <main className="w-full max-w-3xl mx-auto px-container-margin-mobile flex flex-col gap-8 mt-6 animate-fade-in">
        {/* Worker Info */}
        <section className="flex flex-col gap-2">
          <h1 className="text-headline-lg-mobile font-bold text-on-surface">{asha.name}</h1>
          <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full w-max border ${
            asha.isOnline ? 'bg-secondary-container text-on-secondary-container border-secondary/20' : 'bg-error-container text-on-error-container border-error/20'
          }`}>
            <Icon name={asha.isOnline ? 'cloud_done' : 'cloud_off'} fill size={16} />
            <span className="text-label-sm uppercase tracking-wide font-medium">
              {asha.isOnline ? 'Online' : `Offline (${asha.pendingSyncs} Syncs Pending)`}
            </span>
          </div>
        </section>

        {/* Search */}
        <section className="w-full">
          <div className="relative flex items-center w-full">
            <Icon name="search" className="absolute left-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Find household or patient..."
              className="w-full min-h-[56px] pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl text-body-lg text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
            />
          </div>
        </section>

        {/* Patient Roster */}
        <section className="flex flex-col gap-4">
          <h2 className="text-label-md text-on-surface-variant uppercase font-semibold">Patient Roster (Priority)</h2>
          {roster.map((patient) => (
            <article key={patient.id} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-headline-md font-semibold text-on-surface mb-1">{patient.name}</h3>
                  <p className="text-body-md text-on-surface-variant">Age: {patient.age} • Village: {patient.village}</p>
                </div>
                {triageBadge[patient.triageLevel] && (
                  <div className={`${triageBadge[patient.triageLevel].bg} ${triageBadge[patient.triageLevel].text} w-8 h-8 rounded-full flex items-center justify-center`}>
                    <Icon name={triageBadge[patient.triageLevel].icon} size={20} />
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate(`/asha/triage/${patient.id}`)}
                className="w-full min-h-[48px] bg-primary text-on-primary rounded-lg text-label-md font-semibold uppercase tracking-wider hover:bg-surface-tint active:scale-95 transition-all flex justify-center items-center gap-2 mt-2"
              >
                <Icon name="assignment_turned_in" /> Assess Now
              </button>
            </article>
          ))}
        </section>
      </main>

      {/* FAB */}
      <button className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-primary text-on-primary rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center hover:bg-surface-tint active:scale-90 transition-all md:hidden">
        <Icon name="add" fill />
      </button>

      <BottomNavBar role="asha" />
    </div>
  );
}
