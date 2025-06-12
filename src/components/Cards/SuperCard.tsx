import React from 'react';
import superBadge from '$assets/Super/super.svg';
import './Cards.css';

interface CardButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface SuperCardProps {
  title: string;
  description: string;
  button?: CardButton;
}

const SuperCard: React.FC<SuperCardProps> = ({ title, description, button }) => {
  return (
    <div className="sidebar-card">
      <div className="super-header">
        <img src={superBadge} alt="Duo" className="super-badge" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {button && (
        <button
          className={`card-button ${button.variant === 'primary' ? 'primary' : 'secondary'}`}
          onClick={button.onClick}
        >
          {button.label}
        </button>
      )}
    </div>
  );
};

export default SuperCard;
