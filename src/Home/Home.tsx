import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../Assets/Logo.png';
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
        <img src={Logo} className="Logo" alt="logo" />
        <h1 className="Title">TRIO-SIGNO</h1>
        <button className="login-btn" onClick={Login}>Login</button>
      </header>

      <section className="description">
        <h2 className="section-title">Our Goal</h2>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">To make sign language learning accessible</h3>
            <p>
              Our platform is designed to break down the barriers to learning sign language,
              making it accessible to everyone, regardless of their background or location.
              Whether you're a beginner or someone looking to improve, our intuitive interface
              allows you to start learning anytime, anywhere.
            </p>
          </div>
          <div className="section-image">
            <img src={Acces} alt="Accessibility" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Fun</h3>
            <p>
              Learning a new language doesn't have to be tedious. With engaging exercises, gamification
              features such as streaks, levels, and leaderboards, we make the learning process exciting
              and enjoyable. Challenge yourself, track your progress, and compete with others while mastering sign language.
            </p>
          </div>
          <div className="section-image">
            <img src={Fun} alt="Fun" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Free</h3>
            <p>
              At TRIO-SIGNO, we believe that learning sign language should be free for everyone. That's why
              all our resources, lessons, and tools are provided at no cost, ensuring that financial barriers
              do not prevent anyone from gaining access to vital communication skills.
            </p>
          </div>
          <div className="section-image">
            <img src={Free} alt="Free" />
          </div>
        </div>

        <div className="section-container">
          <div className="section-text">
            <h3 className="section-subtitle">Assisted by AI</h3>
            <p>
              Our cutting-edge AI technology is here to help you along your learning journey. The AI can recognize
              your signs, provide instant feedback, and adapt the lessons based on your progress, ensuring a personalized
              and efficient learning experience. With AI assistance, you'll improve your sign language skills faster and more accurately.
            </p>
          </div>
          <div className="section-image">
            <img src={IA} alt="AI" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team">
          <div className="team-member">
            <img src={Lenny} alt="Lenny Vigeon" className="team-photo" />
            <p>Lenny Vigeon - Frontend Developer</p>
          </div>
          <div className="team-member">
            <img src={Jp} alt="Jean-Pierre Janopoulos" className="team-photo" />
            <p>Jean-Pierre Janopoulos - Backend Developer</p>
          </div>
          <div className="team-member">
            <img src={Enzo} alt="Enzo Pfeiffer" className="team-photo" />
            <p>Enzo Pfeiffer - AI Specialist</p>
          </div>
          <div className="team-member">
            <img src={Valentin} alt="Valentin Maurel" className="team-photo" />
            <p>Valentin Maurel - Fullstack Developer</p>
          </div>
          <div className="team-member">
            <img src={Antoine} alt="Antoine Rospars" className="team-photo" />
            <p>Antoine Rospars - AI Engineer</p>
          </div>
          <div className="team-member">
            <img src={Yann} alt="Yann Lebib" className="team-photo" />
            <p>Yann Lebib - Backend Developer</p>
          </div>
        </div>
      </section>

      <section className="live-demo">
        <h2>Live demo</h2>
        <button className="login-btn" onClick={Courses}>try a lesson</button>

      </section>

      <footer className="footer">
        <div>About</div>
        <ul>
          <li><a href="">Courses</a></li>
          <li><a href="">Missions</a></li>
        </ul>
        <div>Product</div>
        <ul>
          <li><a href="">Instagram</a></li>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Youtube</a></li>
        </ul>
        <div>Our app</div>
        <ul>
          <li><a href="">Instagram</a></li>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Youtube</a></li>
        </ul>
        <div>Support</div>
        <ul>
          <li><a href="">Instagram</a></li>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Youtube</a></li>
        </ul>
        <div>Conditions</div>
        <ul>
          <li><a href="">Instagram</a></li>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Youtube</a></li>
        </ul>
        <div>Social</div>
        <ul>
          <li><a href="">Instagram</a></li>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Youtube</a></li>
        </ul>
      </footer>
    </div>
  );

  return (

    <div className="homepage">

      <header className="header">
        <div>
          <h1>Triosigno</h1>
          <nav className="nav">
            <img src={Logo} alt="Logo" className="logo" />
            <button className="login-btn" onClick={Login}>Login</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="project-description">
          <h1 className="section-title">Project description</h1>
          <div>vidéo demo</div>
          <div>
            <div>free and fun</div>
            <div>demander a qq qui parle la lsf pour une expertise</div>
          </div>

        </section>

        <section className="Fremium">
          <h1 className="section-title">Fremium</h1>

        </section>

        <section className="team-section">
          <h1 className="section-title">Our team</h1>
          {/* mettre les linkedin ect... */}
          <img src={Antoine} alt="Antoine" />
          <img src={Enzo} alt="Enzo" />
          <img src={Lenny} alt="Lenny" />
          <img src={Valentin} alt="Valentin" />
          <img src={Jp} alt="Jp" />
          <img src={Yann} alt="Yann" />
        </section>

        <section className="team-section">
          <h1 className="section-title">Let's practice</h1>
          <button className="login-btn" onClick={Login}>Let's go</button>

        </section>
      </main>


    </div>
  );
};

export default Home;
