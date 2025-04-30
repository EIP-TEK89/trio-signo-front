import React from 'react';
import radioBadge from '$assets/components/RightSidebar/radioBadge.svg';
import './Cards.css';

interface Badge {
  icon: string;
  title: string;
  description: string;
}

interface BadgeCardProps {
  title: string;
  badges: Badge[];
}

const BadgeCard: React.FC<BadgeCardProps> = ({ title, badges }) => {
  return (
    <div className="sidebar-card badge-card">
      <h3>{title}</h3>
      <div className="badge-list">
        {badges.map((badge, index) => (
          <div key={index} className="badge-item">
            <img src={radioBadge} alt="Radio" className="radio-badge" />
            <div className="badge-info">
              <h4>{badge.title}</h4>
              <p>{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCard;
