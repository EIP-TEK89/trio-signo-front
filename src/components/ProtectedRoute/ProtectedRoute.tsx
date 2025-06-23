import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, validateToken, isValidating } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          setIsChecking(false);
          return;
        }

        // Validate token with backend
        const isValid = await validateToken();
        setIsValid(isValid);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsValid(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, validateToken]);

  // Show loading while checking
  if (isChecking || isValidating) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  // If not authenticated or token not valid, redirect to login
  if (!isAuthenticated || !isValid) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location.pathname }} replace />;
  }

  // If authenticated and token valid, render children
  return <>{children}</>;
};

export default ProtectedRoute;
