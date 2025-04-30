import React, { useState } from 'react';
import Navbar from '$components/NavBar/NavBar';
import RightSidebar from '$components/RightSidebar/RightSidebar';
import { useNavigate } from 'react-router-dom';
import { useSigns } from '$hooks/useSign';
import { Sign } from '$services/signService';
import './Dictionary.css';

const DictionaryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { signs, loading, error } = useSigns();

  const lowerSearch = searchTerm.toLowerCase();

  const { letterSigns, wordSigns } = signs.reduce(
    (acc, sign) => {
      const isMatch = sign.word.toLowerCase().includes(lowerSearch);
      if (!isMatch) return acc;

      if (sign.word.length === 1) {
        acc.letterSigns.push(sign);
      } else {
        acc.wordSigns.push(sign);
      }

      return acc;
    },
    { letterSigns: [], wordSigns: [] } as {
      letterSigns: Sign[];
      wordSigns: Sign[];
    },
  );

  letterSigns.sort((a, b) => a.word.localeCompare(b.word));
  wordSigns.sort((a, b) => a.word.localeCompare(b.word));

  const handleWordClick = (word: string) => {
    // Convert the word to URL-friendly format
    const urlWord = word.replace(/\s+/g, '-');
    navigate(`/coursesJourney/dictionary/${urlWord}`);
  };

  if (loading) {
    return (
      <div className="duolingo-container">
        <Navbar />
        <main className="main-content">
          <div>Loading signs...</div>
        </main>
        <RightSidebar cards={[]} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="duolingo-container">
        <Navbar />
        <main className="main-content">
          <div>Error loading signs: {error.message}</div>
        </main>
        <RightSidebar cards={[]} />
      </div>
    );
  }

  return (
    <div className="duolingo-container">
      <Navbar />
      <main className="main-content">
        <header className="dictionary-header">
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
        <section className="dictionary-section">
          <h2 className="dictionary-section-title">Lettres</h2>
          <div className="dictionary-letter-grid">
            {letterSigns.map((sign) => (
              <button key={sign.id} className="dictionary-letter-button" onClick={() => handleWordClick(sign.word)}>
                {sign.word.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <div className="dictionary-separator" />

        {/* Signs section */}
        <section className="dictionary-section">
          <h2 className="dictionary-section-title">Signes</h2>
          <div className="dictionary-word-grid">
            {wordSigns.map((sign) => (
              <button key={sign.id} className="dictionary-word-button" onClick={() => handleWordClick(sign.word)}>
                {sign.word}
              </button>
            ))}
          </div>
        </section>
      </main>

      <RightSidebar
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
          {
            type: 'league',
            leagueType: 'LIGUES',
            title: 'Bien joué !',
            description: 'Tu as terminé n° 15 et sauvé ta place en Division Saphir',
            button: {
              label: 'VOIR LES LIGUES',
              onClick: () => {},
              variant: 'secondary',
            },
          },
          {
            type: 'quest',
            title: 'Quêtes du jour',
            current: 0,
            total: 10,
            reward: 'Gagne 10 XP',
          },
          {
            type: 'badge',
            title: 'Badges mensuels',
            badges: [
              {
                icon: '/path-to-badge-icon.svg',
                title: 'Termine 30 quêtes',
                description: 'pour remporter le badge du mois',
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default DictionaryPage;
