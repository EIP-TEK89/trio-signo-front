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
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <header className="quests-header">
          <button onClick={logout} className="logout-button">
            Déconnexion
          </button>
        </header>

        <div className="quests-container"></div>
      </main>

      {/* Right Sidebar */}
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

export default ProfilePage;
