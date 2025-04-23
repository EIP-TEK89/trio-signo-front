import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, token } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    // Simple validation that we have a token
    // In a real app, you might want to check if the token is valid
    // by making a request to the server
    if (token) {
      setIsVerifying(false);
    } else {
      setIsVerifying(false);
    }
  }, [token]);

  // Show loading while verifying
  if (isVerifying) {
    return <div className="loading-spinner">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;