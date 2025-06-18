import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendUser, setBackendUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

  // Clear error helper
  const clearError = () => setError(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          
          // Send to backend for verification and JWT creation
          const response = await apiService.auth.firebaseLogin({
            idToken,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });
          
          // Store backend JWT token
          localStorage.setItem('token', response.data.token);
          
          // Set user states
          setUser(firebaseUser);
          setBackendUser(response.data.user);
          setError(null);
          
          console.log('Authentication successful:', response.data.user);
        } catch (error) {
          console.error('Backend authentication failed:', error);
          setError('Authentication failed: ' + (error.message || 'Unknown error'));
          
          // Clear tokens on failure
          localStorage.removeItem('token');
          setUser(null);
          setBackendUser(null);
        }
      } else {
        // User signed out
        localStorage.removeItem('token');
        setUser(null);
        setBackendUser(null);
        setError(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      if (displayName) {
        await updateProfile(result.user, { displayName });
      }
      
      // The onAuthStateChanged listener will handle backend integration
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // The onAuthStateChanged listener will handle backend integration
      return result;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const result = await signInWithPopup(auth, googleProvider);
      
      // The onAuthStateChanged listener will handle backend integration
      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      
      // Call backend logout (optional)
      try {
        await apiService.auth.logout();
      } catch (backendError) {
        console.warn('Backend logout failed:', backendError);
        // Continue with Firebase logout even if backend fails
      }
      
      // Sign out from Firebase
      await signOut(auth);
      
      // Clear local storage
      localStorage.removeItem('token');
      
      // Reset states
      setUser(null);
      setBackendUser(null);
      setError(null);
      
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Reset password error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates) => {
    try {
      setError(null);
      
      if (!user) {
        throw new Error('No authenticated user');
      }
      
      // Update Firebase profile if display name or photo URL changed
      const firebaseUpdates = {};
      if (updates.displayName !== undefined) {
        firebaseUpdates.displayName = updates.displayName;
      }
      if (updates.photoURL !== undefined) {
        firebaseUpdates.photoURL = updates.photoURL;
      }
      
      if (Object.keys(firebaseUpdates).length > 0) {
        await updateProfile(user, firebaseUpdates);
      }
      
      // Update backend profile
      const response = await apiService.auth.updateProfile(updates);
      setBackendUser(response.data.user);
      
      console.log('Profile updated successfully');
      return response.data.user;
    } catch (error) {
      console.error('Update profile error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Refresh user data from backend
  const refreshUserData = async () => {
    try {
      if (!user) return null;
      
      const response = await apiService.auth.getProfile();
      setBackendUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Refresh user data error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return backendUser?.role === 'admin';
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return user !== null && backendUser !== null;
  };

  // Get current user token
  const getCurrentToken = async () => {
    try {
      if (!user) return null;
      return await user.getIdToken();
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  };

  // Verify token validity
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return false;
      
      const response = await apiService.auth.verifyToken(token);
      return response.data.valid;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  };

  const value = {
    // User states
    user,
    backendUser,
    loading,
    error,
    
    // Authentication methods
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
    
    // Profile methods
    updateUserProfile,
    refreshUserData,
    
    // Utility methods
    isAdmin,
    isAuthenticated,
    getCurrentToken,
    verifyToken,
    clearError,
    
    // User data shortcuts
    userId: backendUser?._id,
    userEmail: backendUser?.email || user?.email,
    userName: backendUser?.name || user?.displayName,
    userPhoto: backendUser?.photoURL || user?.photoURL,
    userRole: backendUser?.role || 'user'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};