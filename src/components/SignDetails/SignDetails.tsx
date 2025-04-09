import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import RightSidebar from '../RightSidebar/RightSidebar';
import { ROUTES } from '../../constants/routes';
import './SignDetails.css';

// This would typically come from your database or API
const signDetails: { [key: string]: { 
  word: string;
  definition: string;
  videoUrl: string;
  realisations: string[];
  importance: string[];
}} = {
  'bonjour': {
    word: 'Bonjour',
    definition: "salutation à quelqu'un que l'on rencontre la journée.",
    videoUrl: '/videos/bonjour.mp4',
    realisations: [
      "Position de la main : Place une main ouverte (paume vers toi) au niveau de ton menton.",
      "Mouvement : Fais un léger mouvement vers l'avant, en éloignant ta main de ton visage.",
      "Expression faciale : Comme en LSF, l'expression du visage est essentielle ! Un léger sourire renforce le message positif du salut."
    ],
    importance: [
      "Ne colle pas trop la main au visage au départ, elle doit effleurer le menton.",
      "Le mouvement doit être fluide et naturel, pas brusque.",
      "Garde une expression bienveillante pour que le signe reste convivial et accueillant.",
      "Le regard est essentiel : en LSF, regarder la personne à qui tu t'adresses est important pour la communication."
    ]
  },
  'au-revoir': {
    word: 'Au revoir',
    definition: '',
    videoUrl: '/videos/au-revoir.mp4',
    realisations: [],
    importance: []
  },
  // Add more signs here
};

const SignDetails: React.FC = () => {
  const { signId } = useParams<{ signId: string }>();
  const navigate = useNavigate();
  
  const sign = signId ? signDetails[signId.toLowerCase()] : null;

  if (!sign) {
    return <div>Sign not found</div>;
  }

  return (
    <div className="duolingo-container">
      <Navbar />
      
      <main className="main-content">
        <div className="sign-details-container">
          <button 
            className="back-button"
            onClick={() => navigate(ROUTES.COURSES_JOURNEY.DICTIONARY)}
          >
            ← Retour au dictionnaire
          </button>
          
          <h1 className="sign-title">{sign.word}</h1>
          <h2 className="sign-definition">{sign.definition}</h2>
          
          <div className="video-container">
            <video 
              controls 
              src={sign.videoUrl}
              className="sign-video"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="sign-realisations">
            <h3>Réalisations</h3>
            {sign.realisations.map((realisation, index) => (
              <p key={index}>{realisation}</p>
            ))}
          </div>

          <div className="sign-importance">
            <h3>Points importants</h3>
            {sign.importance.map((point, index) => (
              <p key={index}>{point}</p>
            ))}
          </div>
        </div>
      </main>

      <RightSidebar
        stats={{
          streak: 5,
          gems: 100,
          hearts: 3
        }}
        cards={[]}
      />
    </div>
  );
};

export default SignDetails; 