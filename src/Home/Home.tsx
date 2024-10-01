import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Acces from '../Assets/acces.png';
import Fun from '../Assets/fun.png';
import Free from '../Assets/free.png';
import IA from '../Assets/IA.png';


import Enzo from '../Assets/Team/Enzo.png';
import Yann from '../Assets/Team/Yann.png';
import Jp from '../Assets/Team/Jp.png';
import Lenny from '../Assets/Team/Lenny.png';
import Valentin from '../Assets/Team/Valentin.png';
import Antoine from '../Assets/Team/Antoine.png';

import './Home.css';
import '../App.css';
import { access } from 'fs';

const Home: React.FC = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (!token) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const Login = async () => {
    navigate('/login');
  };

  const Courses = async () => {
    navigate('/courses');
  };

  return (
    <div className="Home">
      <header className="App-header">
        <h1 className="title">Signify</h1>
        <button className="pushable login" onClick={Login}>
          <span className="front">
            Login
          </span>
        </button>
      </header>

      <section className="description">
        <h2 className="section-title">Our Goal</h2>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">To make sign language learning accessible</h3>
            <p>
              Our platform is designed to break down the barriers to learning sign language,
              making it accessible to everyone.
              Whether you're a beginner or someone looking to improve, our intuitive interface
              allows you to start learning anytime, anywhere.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/accessible */}
            <img src={Acces} alt="Accessibility" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Fun</h3>
            <p>
              Learning a new language doesn't have to be tedious. With engaging exercises, gamification
              , we make the learning process exciting
              and enjoyable. Challenge yourself, track your progress, and compete with others while mastering sign language.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/amusant */}
            <img src={Fun} alt="Fun" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Free</h3>
            <p>
              At Signify, we believe that learning sign language should be free for everyone. That's why
              all our resources, lessons, and tools are provided at no cost, ensuring that financial barriers
              do not prevent anyone from gaining access to a new communication skills.
            </p>
          </div>
          <div className="section-image">
            {/* https://dico.elix-lsf.fr/dictionnaire/gratuit */}
            <img src={Free} alt="Free" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Assisted by AI</h3>
            <p>
              Our cutting-edge AI technology is here to help you along your learning journey. The AI can recognize
              your signs, provide instant feedback, ensuring a personalized and efficient learning experience.
              With AI assistance, you'll improve your sign language skills faster and more accurately.
            </p>
          </div>
          <div className="section-image">
            {/* faire une animation avec la lettre IA https://dico.elix-lsf.fr/dictionnaire/IA */}
            <img src={IA} alt="AI" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Meet the Team</h2>
        <div className="team">
          <div className="team-member">
            <img src={Lenny} alt="Lenny Vigeon" className="team-photo" />
            <p>Lenny Vigeon - IA Developer</p>
          </div>
          <div className="team-member">
            <img src={Antoine} alt="Antoine Rospars" className="team-photo" />
            <p>Antoine Rospars - Back-end Developer</p>
          </div>
          <div className="team-member">
            <img src={Yann} alt="Yann Lebib" className="team-photo" />
            <p>Yann Lebib - Front-end Developer</p>
          </div>
          <div className="team-member">
            <img src={Jp} alt="Jean-Pierre Janopoulos" className="team-photo" />
            <p>Jean-Pierre Janopoulos - IA Developer</p>
          </div>
          <div className="team-member">
            <img src={Valentin} alt="Valentin Maurel" className="team-photo" />
            <p>Valentin Maurel - Back-end Developer</p>
          </div>
          <div className="team-member">
            <img src={Enzo} alt="Enzo Pfeiffer" className="team-photo" />
            <p>Enzo Pfeiffer - Front-end Developer</p>
          </div>
        </div>
      </section>

      <section className="live-demo">
        {/* Direct hand-tracking but failed https://codepen.io/mediapipe-preview/pen/gOKBGPN */}
        <h2 className="section-title">Try a lesson now</h2>
        <button className="pushable" onClick={Courses}>
          <span className="front">
            TRY
          </span>
        </button>

      </section>

      <footer className="footer">
        <div className="footer-section">
          <div className='test'>About</div>
          <ul>
            <li><a href="">Courses</a></li>
            <li><a href="">Missions</a></li>
            <li><a href="">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Product</div>
          <ul>
            <li><a href="">Signify</a></li>
            <li><a href="">Super Signify</a></li>
            <li><a href="">Offers Super Signify</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Our app</div>
          <ul>
            <li><a href="">Signify for Android</a></li>
            <li><a href="">Signify for IOS</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Conditions</div>
          <ul>
            <li><a href="">Community guidelines</a></li>
            <li><a href="">Terms</a></li>
            <li><a href="">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <div>Social</div>
          <ul>
            <li><a href="">Instagram</a></li>
            <li><a href="">Twitter</a></li>
            <li><a href="">Youtube</a></li>
          </ul>
        </div>
      </footer>

    </div>
  );
};

export default Home;
