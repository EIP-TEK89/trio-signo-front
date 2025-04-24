import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import { useAuth } from '../../../hooks/useAuth';
import './Profile.css';

const ProfilePage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="quests-header">
          <button 
            onClick={logout}
            className="logout-button"
          >
            Déconnexion
          </button>
        </header>

        <div className="quests-container">
          
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
            type: 'badge',
            title: 'Badges mensuels',
            badges: [
              {
                icon: '/duo-badge-icon.svg',
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

export default ProfilePage;
