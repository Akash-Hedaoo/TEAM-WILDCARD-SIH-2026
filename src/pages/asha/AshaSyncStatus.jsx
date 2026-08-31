import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { ashaSyncQueue } from '../../data/dummyData';

export default function AshaSyncStatus() {
  const navigate = useNavigate();
  const statusStyles = {
    pending: { bg: 'bg-tertiary-fixed', text: 'text-on-tertiary-fixed', icon: 'schedule' },
    failed: { bg: 'bg-error-container', text: 'text-on-error-container', icon: 'error' },
    synced: { bg: 'bg-secondary-container', text: 'text-on-secondary-container', icon: 'check_circle' },
  };

  const pendingCount = ashaSyncQueue.filter((s) => s.status === 'pending').length;
  const failedCount = ashaSyncQueue.filter((s) => s.status === 'failed').length;

  return (
    <div className="bg-background text-on-background min-h-screen pt-16 pb-24">
      <header className="fixed top-0 z-40 bg-surface shadow-sm flex justify-between items-center w-full px-container-margin-mobile h-16">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 text-primary hover:bg-surface-container rounded-full transition-colors">
            <Icon name="arrow_back" />
          </button>
          <h1 className="text-headline-md font-bold text-primary">Sync Status</h1>
        </div>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity active:scale-95">
          <Icon name="sync" size={18} /> Sync All
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-container-margin-mobile py-6 flex flex-col gap-6 mt-6 animate-fade-in">
        {/* Status Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-tertiary-fixed/30 rounded-xl p-4 text-center border border-tertiary-fixed-dim">
            <p className="text-headline-lg-mobile font-bold text-tertiary">{pendingCount}</p>
            <p className="text-label-sm text-on-surface-variant font-medium">Pending</p>
          </div>
          <div className="bg-error-container/30 rounded-xl p-4 text-center border border-error/20">
            <p className="text-headline-lg-mobile font-bold text-error">{failedCount}</p>
            <p className="text-label-sm text-on-surface-variant font-medium">Failed</p>
          </div>
          <div className="bg-secondary-container/30 rounded-xl p-4 text-center border border-secondary/20">
            <p className="text-headline-lg-mobile font-bold text-secondary">{ashaSyncQueue.length - pendingCount - failedCount}</p>
            <p className="text-label-sm text-on-surface-variant font-medium">Synced</p>
          </div>
        </div>

        {/* Queue List */}
        <div className="flex flex-col gap-2">
          <h2 className="text-label-md text-on-surface-variant uppercase font-semibold">Sync Queue</h2>
          {ashaSyncQueue.map((item) => {
            const style = statusStyles[item.status];
            return (
              <div key={item.id} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full ${style.bg} ${style.text} flex items-center justify-center flex-shrink-0`}>
                    <Icon name={style.icon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-body-md text-on-surface font-medium truncate">{item.patientName}</p>
                    <p className="text-body-sm text-on-surface-variant">{item.type} • {item.size}</p>
                    <p className="text-label-sm text-on-surface-variant">{item.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-label-sm font-medium capitalize ${style.bg} ${style.text}`}>
                    {item.status}
                  </span>
                  {item.status === 'failed' && (
                    <button className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center hover:opacity-90 transition-opacity">
                      <Icon name="refresh" size={18} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNavBar role="asha" />
    </div>
  );
}
