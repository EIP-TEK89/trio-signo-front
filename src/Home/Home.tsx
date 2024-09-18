import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '../Assets/Logo.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const Login = async () => {
    navigate('/login');
  };

  return (
    <div className="homepage">

      <header className="header">
        <div>
          <nav className="nav">
            <img src={Logo} alt="Logo" className="logo" />
            <button className="login-btn" onClick={Login}>Login</button>
          </nav>
        </div>
        <div></div>
        <div></div>
      </header>

      <main>
        <section className="project-description">
          <h1>Project description</h1>

        </section>

        <section className="Fremium">
          <h1>Fremium</h1>

        </section>

        <section className="team-section">
          <h1>Our team</h1>

        </section>

        <section className="team-section">
          <h1>Let's practice</h1>

        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Nom du Projet. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;
