/**
 * AppContext - Global application state management
 * Handles authentication, user data, offline mode, and notifications
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { currentPatient, currentAshaWorker, currentDoctor, currentAdmin, patients } from '../data/dummyData';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // User & Auth State
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Offline State
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineQueue, setOfflineQueue] = useState([]);

  // UI State
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Data State (from API in real implementation)
  const [patients_, setPatients] = useState(patients);
  const [currentUserData, setCurrentUserData] = useState(null);

  /**
   * Login handler - authenticates user and sets role
   */
  const login = useCallback((userRole, phoneNumber, otp) => {
    try {
      setLoading(true);
      // Simulated API call - would validate OTP and return user data
      let userData = null;
      switch (userRole) {
        case 'patient':
          userData = { ...currentPatient, role: 'patient' };
          break;
        case 'asha':
          userData = { ...currentAshaWorker, role: 'asha' };
          break;
        case 'doctor':
          userData = { ...currentDoctor, role: 'doctor' };
          break;
        case 'admin':
          userData = { ...currentAdmin, role: 'admin' };
          break;
        default:
          throw new Error('Invalid role');
      }

      setUser(userData);
      setRole(userRole);
      setCurrentUserData(userData);
      setIsAuthenticated(true);
      setError(null);
      return { success: true, data: userData };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout handler
   */
  const logout = useCallback(() => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    setCurrentUserData(null);
  }, []);

  /**
   * Add notification
   */
  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }

    return id;
  }, []);

  /**
   * Remove notification
   */
  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  /**
   * Add item to offline queue
   */
  const addToOfflineQueue = useCallback((action) => {
    const id = action.id ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setOfflineQueue(prev => [...prev, { ...action, id, timestamp: Date.now() }]);
    addNotification('Action queued for sync', 'info', 2000);
  }, [addNotification]);

  /**
   * Clear offline queue
   */
  const clearOfflineQueue = useCallback(() => {
    setOfflineQueue([]);
  }, []);

  /**
   * Process offline queue - simulates sync to server
   */
  const processOfflineQueue = useCallback(async () => {
    if (offlineQueue.length === 0) return { success: true, synced: [] };

    setLoading(true);
    try {
      // Simulated API call to sync offline data
      const synced = offlineQueue;
      clearOfflineQueue();
      addNotification(`${synced.length} offline actions synced`, 'success', 2000);
      return { success: true, synced };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [offlineQueue, clearOfflineQueue, addNotification]);

  /**
   * Update patient data (simulated API call)
   */
  const updatePatientData = useCallback((patientId, data) => {
    if (!isOnline) {
      addToOfflineQueue({ type: 'UPDATE_PATIENT', patientId, data });
      return;
    }

    try {
      setLoading(true);
      // Simulated API call
      setPatients(prev =>
        prev.map(p => p.id === patientId ? { ...p, ...data } : p)
      );
      addNotification('Patient data updated', 'success', 2000);
    } catch (err) {
      setError(err.message);
      addNotification('Failed to update patient data', 'error', 2000);
    } finally {
      setLoading(false);
    }
  }, [isOnline, addToOfflineQueue, addNotification]);

  /**
   * Get patient by ID
   */
  const getPatient = useCallback((patientId) => {
    return patients_.find(p => p.id === patientId);
  }, [patients_]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addNotification('Back online - syncing data', 'success', 2000);
      if (role === 'asha') {
        processOfflineQueue();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      addNotification('You are now offline', 'warning', 2000);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [role, addNotification, processOfflineQueue]);

  const value = {
    // Auth
    user,
    role,
    isAuthenticated,
    login,
    logout,

    // Offline
    isOnline,
    offlineQueue,
    addToOfflineQueue,
    clearOfflineQueue,
    processOfflineQueue,

    // UI
    notifications,
    addNotification,
    removeNotification,
    loading,
    error,
    setError,

    // Data
    patients: patients_,
    setPatients,
    currentUserData,
    setCurrentUserData,
    getPatient,
    updatePatientData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;
