import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import RightSidebar from '../../../components/RightSidebar/RightSidebar';
import GuideIcon from '../../../Assets/CoursesJourney/Home/guide.svg';
import WhiteOkIcon from '../../../Assets/CoursesJourney/Home/whiteOk.svg';
import WhiteStarIcon from '../../../Assets/CoursesJourney/Home/whiteStar.svg';
import StarIcon from '../../../Assets/CoursesJourney/Home/star.svg';
import ChestIcon from '../../../Assets/CoursesJourney/Home/chest.svg';
import TrophyIcon from '../../../Assets/CoursesJourney/Home/trophy.svg';
import BackArrowIcon from '../../../Assets/CoursesJourney/Home/backArrow.svg';
import './Home.css';

const HomePage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="lesson-header">
          <div className="lesson-title">
            <button className="back-button">
              <img src={BackArrowIcon} alt="Back" className="back-arrow" />
              CHAPITRE 1, UNITÉ 1
            </button>
            <h1>Utilise des mots de base</h1>
          </div>
          <button className="guide-button">
            <img src={GuideIcon} alt="Guide" />
            <span>GUIDE</span>
          </button>
        </header>

        <div className="lesson-path">
          <button className="lesson-node completed">
            <div className="node-circle">
              <img src={WhiteOkIcon} alt="Completed" />
            </div>
          </button>
          <button className="lesson-node active">
            <div className="node-circle">
              <img src={WhiteStarIcon} alt="Star" />
            </div>
            <div className="start-button">
              COMMENCER
              <div className="start-button-arrow"></div>
            </div>
          </button>
          <button className="lesson-node locked">
            <div className="node-circle">
              <img src={StarIcon} alt="Locked Star" />
            </div>
          </button>
          <button className="lesson-node locked">
            <div className="node-circle">
              <img src={ChestIcon} alt="Chest" />
            </div>
          </button>
          <button className="lesson-node locked">
            <div className="node-circle">
              <img src={TrophyIcon} alt="Trophy" />
            </div>
          </button>
        </div>

        <div className="mascot">
          <img src="/duo-mascot.svg" alt="Duo" className="duo-image" />
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar
  stats={{
    streak: 5,
    gems: 100,
    hearts: 3
  }}
  cards={[
    {
      type: 'super',
      title: 'Essaie Super Duolingo gratuitement',
      description: 'Pas de pubs, entraînements personnalisés et Défis Légendaires illimités !',
      button: {
        label: 'ESSAYER 2 SEMAINES GRATUITES',
        onClick: () => {},
        variant: 'primary'
      }
    },
    {
      type: 'league',
      leagueType: 'LIGUES',
      title: 'Bien joué !',
      description: 'Tu as terminé n° 15 et sauvé ta place en Division Saphir',
      button: {
        label: 'VOIR LES LIGUES',
        onClick: () => {},
        variant: 'secondary'
      }
    },
    {
      type: 'quest',
      title: 'Quêtes du jour',
      current: 0,
      total: 10,
      reward: 'Gagne 10 XP'
    },
    {
      type: 'badge',
      title: 'Badges mensuels',
      badges: [
        {
          icon: '/path-to-badge-icon.svg',
          title: 'Termine 30 quêtes',
          description: 'pour remporter le badge du mois'
        }
      ]
    }
  ]}
/>
    </div>
  );
};

export default HomePage;
