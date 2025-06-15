import React from 'react';
import './Cards.css';

interface CardButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface LeagueCardProps {
  leagueType: string;
  title: string;
  description: string;
  button?: CardButton;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ leagueType, title, description, button }) => {
  return (
    <div className="sidebar-card league-card">
      <h3>{leagueType}</h3>
      <div className="league-info">
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
    </div>
  );
};

export default LeagueCard;
