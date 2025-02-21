import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Acces from '$assets/acces.png';
import Fun from '$assets/fun.png';
import Free from '$assets/free.png';
import IA from '$assets/IA.png';


import Enzo from '$assets/Team/Enzo.png';
import Yann from '$assets/Team/Yann.png';
import Jp from '$assets/Team/Jp.png';
import Lenny from '$assets/Team/Lenny.png';
import Valentin from '$assets/Team/Valentin.png';
import Antoine from '$assets/Team/Antoine.png';

import './Home.css';
import '../../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const Login = async () => {
    navigate('/signin');
  };

  const Courses = async () => {
    navigate('/courses');
  };

  return (
    <div className="home">
      <header className="app-header">
        <h1 className="title">Signify</h1>
        <button className="pushable login" onClick={Login}>
          <span className="front">
            Connexion
          </span>
        </button>
      </header>

      <section className="description">
        <h2 className="section-title">Notre Objectif</h2>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Rendre l'apprentissage de la langue des signes accessible</h3>
            <p>
              Notre plateforme est conçue pour lever les barrières à l'apprentissage de la langue des signes,
              la rendant accessible à tous.
              Que vous soyez débutant ou en quête de perfectionnement, notre interface intuitive
              vous permet d'apprendre à tout moment, où que vous soyez.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/accessible */}
            <img src={Acces} alt="Accessibility" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Amusant</h3>
            <p>
              Apprendre une nouvelle langue ne doit pas être ennuyeux. Avec des exercices engageants, de la gamification,
              nous rendons le processus d'apprentissage excitant
              et agréable. Relevez des défis, suivez vos progrès et rivalisez avec les autres tout en maîtrisant la langue des signes.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/amusant */}
            <img src={Fun} alt="Fun" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Gratuit</h3>
            <p>
              Chez Signify, nous croyons que l'apprentissage de la langue des signes doit être gratuit pour tous. C'est pourquoi
              toutes nos ressources, leçons et outils sont fournis sans frais, garantissant que les obstacles financiers
              ne privent personne d'accéder à de nouvelles compétences en communication.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/gratuit */}
            <img src={Free} alt="Free" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Assisté par IA</h3>
            <p>
              Notre technologie d'IA de pointe est là pour vous accompagner dans votre apprentissage. L'IA peut reconnaître
              vos signes, fournir un retour instantané, garantissant une expérience d'apprentissage personnalisée et efficace.
              Avec l'assistance de l'IA, vous améliorerez vos compétences en langue des signes plus rapidement et plus précisément.
            </p>
          </div>
          <div className="section-image">
            {/* faire une animation avec la lettre IA https://dico.elix-lsf.fr/dictionnaire/IA */}
            <img src={IA} alt="AI" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Rencontrez l'Équipe</h2>
        <div className="team">
          <div className="team-member">
            <img src={Lenny} alt="Lenny Vigeon" className="team-photo" />
            <p>Lenny Vigeon - Développeur IA</p>
          </div>
          <div className="team-member">
            <img src={Antoine} alt="Antoine Rospars" className="team-photo" />
            <p>Antoine Rospars - Développeur Back-end</p>
          </div>
          <div className="team-member">
            <img src={Yann} alt="Yann Lebib" className="team-photo" />
            <p>Yann Lebib - Développeur Front-end</p>
          </div>
          <div className="team-member">
            <img src={Jp} alt="Jean-Pierre Janopoulos" className="team-photo" />
            <p>Jean-Pierre Janopoulos - Développeur IA</p>
          </div>
          <div className="team-member">
            <img src={Valentin} alt="Valentin Maurel" className="team-photo" />
            <p>Valentin Maurel - Développeur Back-end</p>
          </div>
          <div className="team-member">
            <img src={Enzo} alt="Enzo Pfeiffer" className="team-photo" />
            <p>Enzo Pfeiffer - Développeur Front-end</p>
          </div>
        </div>
      </section>

      <section className="live-demo">
        {/* Direct hand-tracking but failed https://codepen.io/mediapipe-preview/pen/gOKBGPN */}
        <h2 className="section-title">Essayez une leçon maintenant</h2>
        <button className="pushable" onClick={Courses}>
          <span className="front">
            Essayer
          </span>
        </button>

      </section>

      <footer className="footer">
        <div className="footer-section">
          <div className='test'>À propos</div>
          <ul>
            <li><a href="">Cours</a></li>
            <li><a href="">Missions</a></li>
            <li><a href="">Contactez-nous</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Produit</div>
          <ul>
            <li><a href="">Signify</a></li>
            <li><a href="">Super Signify</a></li>
            <li><a href="">Offres Super Signify</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Notre application</div>
          <ul>
            <li><a href="">Signify pour Android</a></li>
            <li><a href="">Signify pour iOS</a></li>
          </ul>

        </div>

        <div className="footer-section">
          <div>Réseaux sociaux</div>
          <ul>
            <li><a href="">Instagram</a></li>
            <li><a href="">Twitter</a></li>
            <li><a href="">YouTube</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Conditions</div>
          <ul>
            <li><a href="">Règles de la communauté</a></li>
            <li><a href="">Conditions</a></li>
            <li><a href="">Confidentialité</a></li>
          </ul>
        </div>
      </footer>

    </div>
  );
};

export default Home;
