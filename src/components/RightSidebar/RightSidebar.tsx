import React from 'react';
import './RightSidebar.css';
import flagIcon from '$assets/components/RightSidebar/flag.svg';
import flameIcon from '$assets/components/RightSidebar/flame.svg';
import gemsIcon from '$assets/components/RightSidebar/gems.svg';
import lifeIcon from '$assets/components/RightSidebar/life.svg';
import superBadge from '$assets/Super/super.svg';
import radioBadge from '$assets/components/RightSidebar/radioBadge.svg';

interface Stats {
  streak: number;
  gems: number;
  hearts: number;
}

interface CardButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface BaseCard {
  type: string;
  title?: string;
  subtitle?: string;
  button?: CardButton;
}

interface SuperDuolingoCard extends BaseCard {
  type: 'super';
  description: string;
}

interface LeagueCard extends BaseCard {
  type: 'league';
  description: string;
  leagueType: string;
}

interface QuestCard extends BaseCard {
  type: 'quest';
  current: number;
  total: number;
  reward: string;
}

interface BadgeCard extends BaseCard {
  type: 'badge';
  badges: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

type Card = SuperDuolingoCard | LeagueCard | QuestCard | BadgeCard;

interface RightSidebarProps {
  stats: Stats;
  cards: Card[];
}

const SidebarCard: React.FC<Card> = (card) => {
  switch (card.type) {
    case 'super':
      return (
        <div className="sidebar-card">
          <div className="super-header">
            <img src={superBadge} alt="Duo" className="super-badge" />
          </div>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          {card.button && (
            <button
              className={`card-button ${card.button.variant === 'primary' ? 'primary' : 'secondary'}`}
              onClick={card.button.onClick}
            >
              {card.button.label}
            </button>
          )}
        </div>
      );

    case 'league':
      return (
        <div className="sidebar-card league-card">
          <h3>{card.leagueType}</h3>
          <div className="league-info">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            {card.button && (
              <button
                className={`card-button ${card.button.variant === 'primary' ? 'primary' : 'secondary'}`}
                onClick={card.button.onClick}
              >
                {card.button.label}
              </button>
            )}
          </div>
        </div>
      );

    case 'quest':
      return (
        <div className="sidebar-card quest-card">
          <h3>
            {card.title}
            <a href="#" className="see-all">AFFICHER TOUT</a>
          </h3>
          <div className="quest-progress">
            <img src={flameIcon} alt="Quest" className="quest-icon" />
            <div className="quest-info">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${(card.current / card.total) * 100}%` }}
                />
              </div>
              <div className="progress-text">{card.current} / {card.total}</div>
              <p className="quest-reward">{card.reward}</p>
            </div>
          </div>
        </div>
      );

    case 'badge':
      return (
        <div className="sidebar-card badge-card">
          <h3>{card.title}</h3>
          <div className="badge-list">
            {card.badges.map((badge, index) => (
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
  }
};

const RightSidebar: React.FC<RightSidebarProps> = ({ stats, cards }) => {
  return (
    <aside className="right-sidebar">
      <div className="stats-bar">
        <div className="language-selector">
          <img src={flagIcon} alt="Language" />
        </div>
        <span className="stat streak">
          <img src={flameIcon} alt="Streak" /> {stats.streak}
        </span>
        <span className="stat gems">
          <img src={gemsIcon} alt="Gems" /> {stats.gems}
        </span>
        <span className="stat hearts">
          <img src={lifeIcon} alt="Hearts" /> {stats.hearts}
        </span>
      </div>

      <div className="sidebar-content">
        {cards.map((card, index) => (
          <SidebarCard key={index} {...card} />
        ))}
      </div>
    </aside>
  );
};

export default RightSidebar; 