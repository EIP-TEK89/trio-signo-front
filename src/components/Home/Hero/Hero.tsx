import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const words = ['Bonjour', 'Je m\'appelle...', 'Merci'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animationState, setAnimationState] = useState<'slide-in' | 'slide-out' | null>(null);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      // Start slide out animation
      setAnimationState('slide-out');

      // After slide out, change word and start slide in
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimationState('slide-in');
      }, 600); // Match the animation duration

    }, 3000); // Total duration for each word

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-bg">
          <div className="hero-bg-blue" />
          <div className="hero-bg-green" />
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div>
              <span className="hero-badge">
                Découvrez la Langue des Signes Française
              </span>
            </div>
            
            <h1 className="hero-title">
              Apprenez à signer{' '}
              <span className="hero-title-highlight">
                <span className={`changing-phrase ${animationState || ''}`}>
                  {words[currentWordIndex]}
                </span>
              </span>
            </h1>
            
            <p className="hero-description">
              Rejoignez une communauté vivante et découvrez la richesse de la langue des signes française 
              à travers des leçons interactives, des vidéos claires et un apprentissage personnalisé.
            </p>
            
            <div className="hero-buttons">
              <button className="hero-btn-primary">
                Commencer
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero-btn-icon">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button className="hero-btn-secondary">
                Explorer les cours
              </button>
            </div>
          </div>
          
          <div className="hero-features">
            {[
              'Vidéos d\'experts sourds natifs',
              'Exercices interactifs immersifs',
              'Apprentissage adapté à votre rythme'
            ].map((feature, index) => (
              <div key={index} className="hero-feature-card">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="hero-feature-icon">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <path d="m9 11 3 3L22 4" />
                </svg>
                <p className="hero-feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
