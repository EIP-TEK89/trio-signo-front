import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const Login = async () => {
    navigate('/signin');
  };

  return (
    <header className="app-header">
      <h1 className="title">Signify</h1>
      <button className="login" onClick={Login}>
        Connexion
      </button>
    </header>
  );
};

export default Header;
