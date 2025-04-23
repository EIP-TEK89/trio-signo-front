import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './LogoutButton.css';

interface LogoutButtonProps {
  className?: string;
  label?: string;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = 'logout-button', 
  label = 'Se déconnecter' 
}) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Use the logout function from useAuth hook
    logout();
  };

  return (
    <button 
      className={className} 
      onClick={handleLogout}
      type="button"
    >
      {label}
    </button>
  );
};

export default LogoutButton;