import React from 'react';
import './Sign.css';

const Sign: React.FC = () => {
  const categories = [
    {
      icon: "👋",
      title: "Salutations et présentations",
      description: "Les bases pour se présenter et interagir"
    },
    {
      icon: "🍽️",
      title: "Nourriture et boissons",
      description: "Tout le vocabulaire pour commander et cuisiner"
    },
    {
      icon: "🏠",
      title: "Maison et famille",
      description: "Le vocabulaire du quotidien et les relations"
    },
    {
      icon: "🚶",
      title: "Verbes et actions",
      description: "Exprimer des actions et des états"
    },
    {
      icon: "❓",
      title: "Questions et réponses",
      description: "Comment poser des questions et y répondre"
    },
    {
      icon: "🌍",
      title: "Voyages et directions",
      description: "Se repérer et parler de ses voyages"
    }
  ];

  return (
    <section className="sign">
      <div className="sign-container">
        <div className="sign-header">
          <span className="sign-badge">
            Catégories
          </span>
          <h2 className="sign-title">Explorez les différentes catégories</h2>
          <p className="sign-subtitle">
            Découvrez un large éventail de signes, organisés par thèmes pour faciliter votre apprentissage.
          </p>
        </div>
        
        <div className="sign-grid">
          {categories.map((category, index) => (
            <div key={index} className="sign-card">
              <div className="sign-card-icon">{category.icon}</div>
              <h3 className="sign-card-title">{category.title}</h3>
              <p className="sign-card-text">{category.description}</p>
              <button className="sign-card-btn">
                Explorer
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sign-card-arrow">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sign;
