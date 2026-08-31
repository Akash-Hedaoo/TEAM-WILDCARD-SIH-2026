/**
 * useAppContext - Custom hook to access AppContext
 * Provides convenient access to global app state
 */

import { useContext } from 'react';
import AppContext from './AppContext';

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }

  return context;
}

export default useAppContext;
