// This file replaces your existing hooks/useAuth.js
// It's now just a wrapper around your AuthContext

import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  return useAuthContext();
};