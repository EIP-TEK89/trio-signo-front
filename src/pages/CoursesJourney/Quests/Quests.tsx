import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import energyIcon from '$assets/CoursesJourney/Quests/energy.svg';
import targetIcon from '$assets/CoursesJourney/Quests/target.svg';
import rewardBronze from '$assets/CoursesJourney/Quests/rewardBronze.svg';
import rewardSilver from '$assets/CoursesJourney/Quests/rewardSilver.svg';
import rewardGold from '$assets/CoursesJourney/Quests/rewardGold.svg';
import './Quests.css';

const QuestsPage: React.FC = () => {
  return (
    <div className="duolingo-container">
      <Navbar />

      <main className="main-content">
        <section className="quests-header">
          <h1>Gagne des récompenses grâce aux quêtes !</h1>
          <p>Tu as terminé 0 quête sur 3 aujourd'hui.</p>
          <div className="mascot-circle">{/* Add your mascot image here */}</div>
        </section>

        <section className="quests-container">
          <header className="quest-title">
            <h2>Quêtes du jour</h2>
            <span className="time-remaining">10 HEURES</span>
          </header>

          <section className="quest-list">
            <article className="quest-item">
              <span className="quest-icon lightning">
                <img src={energyIcon} alt="Energy" />
              </span>
              <div className="quest-content">
                <h3>Gagne 10 XP</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                  <span className="quest-count">0 / 10</span>
                </div>
              </div>
              <img src={rewardBronze} alt="Bronze reward" className="quest-reward" />
            </article>

            <article className="quest-item">
              <span className="quest-icon lightning">
                <img src={energyIcon} alt="Energy" />
              </span>
              <div className="quest-content">
                <h3>Gagne 10 XP de bonus combo</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                  <span className="quest-count">0 / 10</span>
                </div>
              </div>
              <img src={rewardSilver} alt="Silver reward" className="quest-reward" />
            </article>

            <article className="quest-item">
              <span className="quest-icon target">
                <img src={targetIcon} alt="Target" />
              </span>
              <div className="quest-content">
                <h3>Obtiens un score d'au moins 90 % dans 4 leçons</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '0%' }}></div>
                  <span className="quest-count">0 / 4</span>
                </div>
              </div>
              <img src={rewardGold} alt="Gold reward" className="quest-reward" />
            </article>
          </section>
        </section>
      </main>

      <RightSidebar
        cards={[
          {
            type: 'badge',
          },
        ]}
      />
    </div>
  );
};

export default QuestsPage;
