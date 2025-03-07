import React from 'react';
import './Introduction.css';

const Introduction: React.FC = () => {
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="intro-feature-icon">
          <path d="M18 8a5 5 0 0 0-10 0v7h10Z" />
          <path d="M10 8v7" />
          <path d="M14 8v7" />
          <path d="M8 8v7a4 4 0 0 0 8 0" />
        </svg>
      ),
      title: "Une langue visuelle",
      description: "La LSF utilise les mains, les expressions faciales et le corps pour communiquer visuellement",
      color: "blue"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="intro-feature-icon">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "Une langue complète",
      description: "La LSF possède sa propre grammaire et syntaxe, différentes de celles du français parlé",
      color: "green"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="intro-feature-icon">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Une communauté vibrante",
      description: "Plus de 100 000 personnes utilisent la LSF en France comme langue principale",
      color: "purple"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="intro-feature-icon">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      title: "Un patrimoine culturel",
      description: "La LSF est reconnue officiellement depuis 2005 comme une langue à part entière",
      color: "red"
    }
  ];

  return (
    <section className="intro">
      <div className="intro-container">
        <div className="intro-header">
          <span className="intro-badge">
            Qu'est-ce que la LSF ?
          </span>
          <h2 className="intro-title">Découvrez la Langue des Signes Française</h2>
          <p className="intro-subtitle">
            La Langue des Signes Française (LSF) est une langue à part entière, avec sa propre grammaire, sa syntaxe et son vocabulaire riche.
          </p>
        </div>

        <div className="intro-grid">
          {features.map((feature, index) => (
            <div key={index} className="intro-card">
              <div className={`intro-icon-wrapper intro-icon-${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="intro-card-title">{feature.title}</h3>
              <p className="intro-card-text">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="intro-footer">
          <p className="intro-footer-text">
            Apprendre la LSF ouvre la porte vers une nouvelle façon de communiquer et de percevoir le monde. 
            C'est aussi une manière de contribuer à l'inclusion et au dialogue entre les communautés sourde et entendante.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
