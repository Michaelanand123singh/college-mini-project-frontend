import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  // Show loading spinner while authentication is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Check if user is properly authenticated (both Firebase and backend)
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;