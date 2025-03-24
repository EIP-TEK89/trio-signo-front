import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import RightSidebar from '../RightSidebar/RightSidebar';
import './LetterDetails.css';

const LetterDetails: React.FC = () => {
  const navigate = useNavigate();
  const { letter } = useParams<{ letter: string }>();

  const handleBack = () => {
    navigate('/coursesJourney/dictionary');
  };

  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <div className="letter-details-container">
          <button className="back-button" onClick={handleBack}>
            ← Retour
          </button>
          
          <div className="letter-content">
            <div className="letter-display">
              {letter?.toUpperCase()}
            </div>
            <div className="letter-image">
              <img 
                src={`/images/letters/${letter?.toLowerCase()}.png`} 
                alt={`Letter ${letter?.toUpperCase()}`}
                className="letter-img"
              />
            </div>
          </div>
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
          }
        ]}
      />
    </div>
  );
};

export default LetterDetails; 