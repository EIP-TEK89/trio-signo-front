import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import RightSidebar from '../../../components/RightSidebar/RightSidebar';
import './Shop.css';

const ShopPage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="quests-header">
          
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

export default ShopPage;
