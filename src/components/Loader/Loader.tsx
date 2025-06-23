import React from 'react';
import './Loader.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Chargement' }) => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loader-text">
        {message}
        <span className="loader-dots"></span>
      </div>
      <div className="loader-logo">TrioSigno</div>
    </div>
  );
};

export default Loader;
