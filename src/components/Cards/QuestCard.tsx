import React from 'react';
import flameIcon from '$assets/components/RightSidebar/flame.svg';
import './Cards.css';

interface QuestCardProps {
  title: string;
  current: number;
  total: number;
  reward: string;
}

const QuestCard: React.FC<QuestCardProps> = ({ title, current, total, reward }) => {
  return (
    <div className="sidebar-card quest-card">
      <h3>
        {title}
        <a href="#" className="see-all">
          AFFICHER TOUT
        </a>
      </h3>
      <div className="quest-progress">
        <img src={flameIcon} alt="Quest" className="quest-icon" />
        <div className="quest-info">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(current / total) * 100}%` }} />
          </div>
          <div className="progress-text">
            {current} / {total}
          </div>
          <p className="quest-reward">{reward}</p>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
