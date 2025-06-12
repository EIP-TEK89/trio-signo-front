import React from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import './Training.css';

const TrainingPage: React.FC = () => {
  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <header className="training-header"></header>

        <div className="training-container"></div>
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

export default TrainingPage;
