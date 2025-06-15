import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import './Ligue.css';

const LiguePage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <header className="ligue-header"></header>

        <div className="ligue-container"></div>
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

export default LiguePage;
