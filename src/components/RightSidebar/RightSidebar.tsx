import React from 'react';
import './RightSidebar.css';
import flagIcon from '$assets/components/RightSidebar/flag.svg';
import flameIcon from '$assets/components/RightSidebar/flame.svg';
import gemsIcon from '$assets/components/RightSidebar/gems.svg';
import lifeIcon from '$assets/components/RightSidebar/life.svg';
import { SuperCard, LeagueCard, QuestCard, BadgeCard } from '$components/Cards';
import { useUserStats } from '$hooks/useUserStats';

interface Stats {
  streak: number;
  gems: number;
  hearts: number;
}

interface Card {
  type: 'super' | 'league' | 'quest' | 'badge';
}

interface RightSidebarProps {
  cards: Card[];
}

const SidebarCard: React.FC<Card> = (card) => {
  switch (card.type) {
    case 'super':
      return (
        <SuperCard
          title="Essaie Super Duolingo gratuitement"
          description="Pas de pubs, entraînements personnalisés et Défis Légendaires illimités !"
          button={{
            label: 'ESSAYER 2 SEMAINES GRATUITES',
            onClick: () => {},
            variant: 'primary',
          }}
        />
      );

    case 'league':
      return (
        <LeagueCard
          leagueType="Ligue"
          title="Ligue de la semaine"
          description="Montez dans la ligue pour gagner des récompenses !"
          button={{
            label: 'VOIR LA LIGUE',
            onClick: () => {},
            variant: 'secondary',
          }}
        />
      );

    case 'quest':
      return <QuestCard title="Quêtes du jour" current={3} total={5} reward="10 gemmes" />;

    case 'badge':
      return (
        <BadgeCard
          title="Badges"
          badges={[
            {
              icon: 'radio',
              title: 'Explorateur',
              description: 'A complété 10 leçons',
            },
          ]}
        />
      );
  }
};

const RightSidebar: React.FC<RightSidebarProps> = ({ cards }) => {
  const { stats, loading, error } = useUserStats();

  return (
    <aside className="right-sidebar">
      <div className="stats-bar">
        <div className="language-selector">
          <img src={flagIcon} alt="Language" />
        </div>
        <span className="stat streak">
          <img src={flameIcon} alt="Streak" /> {loading || error ? 0 : stats.streak}
        </span>
        <span className="stat gems">
          <img src={gemsIcon} alt="Gems" /> {loading || error ? 0 : stats.gems}
        </span>
        <span className="stat hearts">
          <img src={lifeIcon} alt="Hearts" /> {loading || error ? 0 : stats.hearts}
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
