import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavBar from '../../components/shared/BottomNavBar';
import Icon from '../../components/shared/Icon';
import { useAppContext } from '../../context/useAppContext';
import { processSyncQueue, estimateSyncTime } from '../../workers/syncWorker';

/**
 * AshaSyncStatus - Displays offline sync queue and handles syncing
 * Integrates syncWorker for queue management
 */
export default function AshaSyncStatus() {
  const navigate = useNavigate();
  const { offlineQueue, clearOfflineQueue, isOnline, addNotification } = useAppContext();

  const [syncResult, setSyncResult] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState(null);

  // Calculate estimated sync time when queue changes
  useEffect(() => {
    if (offlineQueue.length > 0) {
      const time = estimateSyncTime(offlineQueue);
      setEstimatedTime(time);
    }
  }, [offlineQueue]);

  const statusConfig = {
    pending: { icon: 'schedule', color: 'var(--tertiary)', badge: 'badge--warning', label: 'Pending' },
    failed: { icon: 'error', color: 'var(--error)', badge: 'badge--red', label: 'Failed' },
    synced: { icon: 'check_circle', color: 'var(--secondary)', badge: 'badge--green', label: 'Synced' },
  };

  // Separate queue items by status
  const syncItems = syncResult ? [
    ...syncResult.synced.map(item => ({ ...item, status: 'synced' })),
    ...syncResult.failed.map(item => ({ ...item, status: 'failed' })),
  ] : offlineQueue.map(item => ({ ...item, status: 'pending' }));

  const pending = syncItems.filter(s => s.status === 'pending');
  const failed = syncItems.filter(s => s.status === 'failed');
  const synced = syncItems.filter(s => s.status === 'synced');

  /**
   * Handle sync all button click
   */
  const handleSyncAll = async () => {
    if (offlineQueue.length === 0) {
      addNotification('Nothing to sync', 'info', 2000);
      return;
    }

    if (!isOnline) {
      addNotification('Cannot sync offline. Please check your connection.', 'warning', 3000);
      return;
    }

    try {
      setIsSyncing(true);
      const result = await processSyncQueue(offlineQueue);
      setSyncResult(result);

      if (result.success) {
        addNotification(`Successfully synced ${result.syncedCount} items`, 'success', 2000);
        clearOfflineQueue();
      } else {
        addNotification(`Sync completed: ${result.syncedCount} synced, ${result.failedCount} failed`, 'warning', 3000);
      }
    } catch (error) {
      addNotification(`Sync error: ${error.message}`, 'error', 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="page-shell">
      <header className="header">
        <button className="btn--icon" onClick={() => navigate(-1)}><Icon name="arrow_back" /></button>
        <h1 className="text-headline-md font-bold" style={{ marginLeft: 'var(--sp-2)', flex: 1 }}>Sync Status</h1>
        <button
          className="btn btn--primary btn--sm"
          onClick={handleSyncAll}
          disabled={isSyncing || !isOnline || offlineQueue.length === 0}
        >
          <Icon name={isSyncing ? 'sync' : 'upload'} size={18} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
          {isSyncing ? ' Syncing...' : ' Sync All'}
        </button>
      </header>

      <div className="container container--narrow animate-fade-in">
        {/* Status Summary */}
        <div className="grid gap-3 mb-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value" style={{ color: 'var(--tertiary)' }}>{pending.length}</div>
            <div className="stat-card-label">Pending</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-error">{failed.length}</div>
            <div className="stat-card-label">Failed</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div className="stat-card-value text-secondary">{synced.length}</div>
            <div className="stat-card-label">Synced</div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="card mb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Icon name={isOnline ? 'wifi' : 'wifi_off'} style={{ color: isOnline ? 'var(--secondary)' : 'var(--error)' }} />
            <div>
              <p className="text-body-md font-semibold">{isOnline ? 'Connected' : 'Offline'}</p>
              <p className="text-body-sm text-muted">
                {estimatedTime && offlineQueue.length > 0
                  ? `Est. sync time: ${estimatedTime}s`
                  : 'Ready to sync'}
              </p>
            </div>
          </div>
          <div className={`status-dot ${isOnline ? 'status-dot--online' : 'status-dot--offline'}`} />
        </div>

        {/* Empty State */}
        {offlineQueue.length === 0 && !syncResult && (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--sp-8)' }}>
            <Icon name="check_circle" style={{ fontSize: '48px', color: 'var(--secondary)', marginBottom: 'var(--sp-4)' }} />
            <p className="text-body-md font-semibold">All synced!</p>
            <p className="text-body-sm text-muted">No pending items to sync.</p>
          </div>
        )}

        {/* Sync Results */}
        {syncResult && (
          <div className={`info-banner info-banner--${syncResult.success ? 'success' : 'warning'} mb-4`}>
            <Icon name={syncResult.success ? 'check_circle' : 'warning'} />
            <div>
              <p className="text-label-md font-bold">
                {syncResult.success ? 'Sync Completed Successfully' : 'Sync Completed with Issues'}
              </p>
              <p className="text-body-sm">
                {syncResult.syncedCount} synced, {syncResult.failedCount} failed ({(syncResult.duration / 1000).toFixed(1)}s)
              </p>
            </div>
          </div>
        )}

        {/* Sync Queue */}
        {offlineQueue.length > 0 && (
          <>
            <h3 className="section-label">Sync Queue</h3>
            <div className="flex flex-col gap-3 mt-3">
              {syncItems.map((item) => {
                const cfg = statusConfig[item.status];
                return (
                  <div key={item.id ?? item.timestamp} className="card flex gap-4" style={{ padding: 'var(--sp-4)' }}>
                    <div className="avatar" style={{ background: 'var(--surface-container)', color: cfg.color, border: 'none' }}>
                      <Icon name={cfg.icon} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="flex justify-between items-start">
                        <h4 className="text-body-md font-semibold truncate">
                          {item.data?.patientId || item.patientName || 'Unknown'}
                        </h4>
                        <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                      </div>
                      <p className="text-body-sm text-muted mt-1">
                        {item.type || 'Unknown'} • {item.data?.triageData ? '~2.4 MB' : '~0.8 MB'}
                      </p>
                      <p className="text-label-sm text-muted mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {item.status === 'failed' && (
                      <button className="btn--icon" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                        <Icon name="refresh" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <BottomNavBar role="asha" />
    </div>
  );
}
