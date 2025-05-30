import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import './Training.css';

const TrainingPage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="training-header">
          
        </header>

        <div className="training-container">
          
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

export default TrainingPage;
