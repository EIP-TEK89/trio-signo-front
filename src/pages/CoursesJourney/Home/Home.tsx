import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import RightSidebar from '../../../components/RightSidebar/RightSidebar';
import LessonPath from '../../../components/LessonPath/LessonPath';
import GuideIcon from '../../../Assets/CoursesJourney/Home/guide.svg';
import BackArrowIcon from '../../../Assets/CoursesJourney/Home/backArrow.svg';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const GoToCourses = async () => {
      navigate('/courses');
  };

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

        {/* Lesson Paths */}
        <div className="lesson-paths-container">
          <LessonPath 
            onStartLesson={GoToCourses} 
            color="var(--color-green-primary)" 
            curveDirection="left"
            title="Describe people" 
          />
          <LessonPath 
            onStartLesson={GoToCourses} 
            color="#9B6DFF" 
            curveDirection="right"
            title="Family members" 
          />
          <LessonPath 
            onStartLesson={GoToCourses} 
            color="#FFD700" 
            curveDirection="left"
            title="Basic phrases" 
          />
          <LessonPath 
            onStartLesson={GoToCourses} 
            color="#FF6B6B" 
            curveDirection="right"
            title="Common verbs" 
          />
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
