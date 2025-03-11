import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import RightSidebar from '../../../components/RightSidebar/RightSidebar';
import './Shop.css';

import heartIcon from '../../../Assets/CoursesJourney/Shop/heart.svg';
import infiniteLivesIcon from '../../../Assets/CoursesJourney/Shop/premiumHeart.svg';
import streakFreezeIcon from '../../../Assets/CoursesJourney/Shop/freeze.svg';
import gemsIcon from '../../../Assets/components/RightSidebar/gems.svg';
import duoMascot from '../../../Assets/CoursesJourney/Shop/mascott.svg';

const ShopPage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="shop-header">
          <span className="super-badge">SUPER</span>
          <img src={duoMascot} alt="Duo" className="duo-mascot" />
          <div className="header-content">
            <h1>Commence un essai gratuit de 2 semaines pour profiter des avantages exclusifs Super Duolingo</h1>
            <button className="trial-button">COMMENCER 14 JOURS GRATUITS</button>
          </div>
        </header>

        <div className="shop-container">
          {/* Lives Section */}
          <section className="shop-section">
            <h2>Vies</h2>
            <div className="shop-items">
              <div className="shop-item">
                <div className="item-content">
                  <div className="item-icon heart-icon">
                    <img src={heartIcon} alt="Heart" />
                  </div>
                  <div className="item-info">
                    <h3>Recharger mes vies</h3>
                    <p>Recharge toutes tes vies, tu auras une plus grande marge d'erreur pendant tes leçons</p>
                  </div>
                </div>
                <button className="shop-button secondary">VIES AU MAX</button>
              </div>

              <div className="shop-item">
                <div className="item-content">
                  <div className="item-icon infinite-lives">
                    <img src={infiniteLivesIcon} alt="Infinite Lives" />
                  </div>
                  <div className="item-info">
                    <h3>Vies Illimitées</h3>
                    <p>Ne perds plus jamais de vies avec Super Duolingo !</p>
                  </div>
                </div>
                <button className="shop-button primary">ESSAI GRATUIT</button>
              </div>
            </div>
          </section>

          <div className="shop-separator"></div>

          {/* Boosters Section */}
          <section className="shop-section">
            <h2>Boosters</h2>
            <div className="shop-items">
              <div className="shop-item">
                <div className="item-content">
                  <div className="item-icon streak-freeze">
                    <img src={streakFreezeIcon} alt="Streak Freeze" />
                  </div>
                  <div className="item-info">
                    <h3>Gel de série</h3>
                    <p>Avec un Gel de série, tu gardes ta série même si tu manques un jour d'entraînement !</p>
                    <span className="active-status">0/2 ACTIVE</span>
                  </div>
                </div>
                <button className="shop-button gem-button">
                  OBTENIR POUR <img src={gemsIcon} alt="Gems" /> 200
                </button>
              </div>
            </div>
          </section>
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
