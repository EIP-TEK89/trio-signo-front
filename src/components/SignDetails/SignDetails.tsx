import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import { useSignByWord } from '$hooks/useSign';
import './SignDetails.css';

const SignDetails: React.FC = () => {
  const navigate = useNavigate();
  const { signId } = useParams<{ signId: string }>();
  const { sign, loading, error } = useSignByWord(signId || '');

  const handleBack = () => {
    navigate('/coursesJourney/dictionary');
  };

  if (loading) {
    return (
      <div className="duolingo-container">
        <Navbar />
        <main className="main-content">
          <div>Loading sign details...</div>
        </main>
        <RightSidebar
          stats={{
            streak: 5,
            gems: 100,
            hearts: 3,
          }}
          cards={[]}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="duolingo-container">
        <Navbar />
        <main className="main-content">
          <div>Error loading sign details: {error.message}</div>
        </main>
        <RightSidebar
          stats={{
            streak: 5,
            gems: 100,
            hearts: 3,
          }}
          cards={[]}
        />
      </div>
    );
  }

  console.log(sign)

  const currentSign = sign?.[0];

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
            <div className="letter-display">{signId}</div>
            {currentSign && (
              <>
                <div className="letter-image">
                  {currentSign.mediaUrl &&
                    (currentSign.mediaUrl.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                      <img src={currentSign.mediaUrl} alt={`Sign ${currentSign.word}`} className="letter-media" />
                    ) : (
                      <video src={currentSign.mediaUrl} controls className="letter-media" autoPlay loop muted>
                        Your browser does not support the video tag.
                      </video>
                    ))}
                </div>
                <div className="letter-info">
                  <p>{currentSign.definition}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar
        stats={{
          streak: 5,
          gems: 100,
          hearts: 3,
        }}
        cards={[
          {
            type: 'super',
            title: 'Essaie Super Duolingo gratuitement',
            description: 'Pas de pubs, entraînements personnalisés et Défis Légendaires illimités !',
            button: {
              label: 'ESSAYER 2 SEMAINES GRATUITES',
              onClick: () => {},
              variant: 'primary',
            },
          },
        ]}
      />
    </div>
  );
};

export default SignDetails;
