import React from 'react';
import './Journey.css';

const Journey: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Découverte des bases",
      description: "Apprenez l'alphabet, les nombres et les premiers signes essentiels pour communiquer."
    },
    {
      number: "02",
      title: "Construction de phrases",
      description: "Maîtrisez la syntaxe et la grammaire propres à la LSF pour former des phrases complètes."
    },
    {
      number: "03",
      title: "Conversation courante",
      description: "Développez votre fluidité pour tenir des conversations sur des sujets quotidiens."
    },
    {
      number: "04",
      title: "Expression avancée",
      description: "Perfectionnez votre expressivité et abordez des sujets plus complexes et nuancés."
    }
  ];

  return (
    <section className="journey">
      <div className="journey-container">
        <div className="journey-header">
          <span className="journey-badge">Votre parcours</span>
          <h2 className="journey-title">Comment vous allez progresser</h2>
          <p className="journey-subtitle">
            Notre méthode progressive vous permet d'acquérir les compétences en LSF de manière efficace.
          </p>
        </div>
        
        <div className="journey-steps">
          {steps.map((step, index) => (
            <div key={index} className="journey-item">
              <div className={`journey-number ${index === 0 ? 'journey-number-active' : ''}`}>
                {step.number}
              </div>
              <div className={`journey-content ${index === 3 ? '' : 'journey-content-border'}`}>
                <h3 className="journey-item-title">{step.title}</h3>
                <p className="journey-item-text">{step.description}</p>
                <button className={`journey-btn ${index === 0 ? 'journey-btn-active' : ''}`}>
                  {index === 0 ? 'En cours' : 'Démarrer'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey; 