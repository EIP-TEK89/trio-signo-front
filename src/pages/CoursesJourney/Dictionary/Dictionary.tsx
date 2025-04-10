import React, { useState } from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import { useNavigate } from 'react-router-dom';
import './Dictionary.css';

const DictionaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for the word list
  const words = ['Bonjour', 'Merci', 'Au revoir', 'S\'il te plaît'];

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  // Filter both words and letters
  const filteredWords = words.filter(word =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLetters = letters.filter(letter =>
    letter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleWordClick = (word: string) => {
    // Convert the word to URL-friendly format
    const urlWord = word.toLowerCase().replace(/\s+/g, '-');
    navigate(`/coursesJourney/dictionary/${urlWord}`);
  };

  const handleLetterClick = (letter: string) => {
    // Navigate to letter description page
    navigate(`/coursesJourney/dictionary/letter/${letter.toLowerCase()}`);
  };

  return (
    <div className="duolingo-container">
      {/* Left Sidebar */}
      <Navbar/>

      {/* Main Content */}
      <main className="main-content">
        <header className="dictionary-header">
          {/* Search bar */}
          <div className="dictionary-search-container">
            <input
              type="text"
              className="dictionary-search-input"
              placeholder="Rechercher un mot ou une lettre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Letters section */}
        <div className="dictionary-words-container">
          <div className="dictionary-word-grid">
            {(searchTerm ? filteredLetters : letters).map((letter) => (
              <button
                key={letter}
                className="dictionary-letter-button"
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
          {(searchTerm ? filteredLetters.length > 0 : true) && (
            <div className="dictionary-separator" />
          )}
        </div>

        {/* Words list */}
        <div className="dictionary-words-container">
          <div className="dictionary-word-grid">
            {filteredWords.map((word, index) => (
              <button
                key={index}
                className="dictionary-word-button"
                onClick={() => handleWordClick(word)}
              >
                {word}
              </button>
            ))}
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
          },
          {
            type: 'league',
            leagueType: 'LIGUES',
            title: 'Bien joué !',
            description: 'Tu as terminé n° 15 et sauvé ta place en Division Saphir',
            button: {
              label: 'VOIR LES LIGUES',
              onClick: () => {},
              variant: 'secondary'
            }
          },
          {
            type: 'quest',
            title: 'Quêtes du jour',
            current: 0,
            total: 10,
            reward: 'Gagne 10 XP'
          },
          {
            type: 'badge',
            title: 'Badges mensuels',
            badges: [
              {
                icon: '/path-to-badge-icon.svg',
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

export default DictionaryPage;
