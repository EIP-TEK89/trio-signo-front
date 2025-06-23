import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '$components/Home/Header/Header';
import Hero from '$components/Home/Hero/Hero';
import Introduction from '$components/Home/Introduction/Introduction';
import Sign from '$components/Home/Sign/Sign';
import Journey from '$components/Home/Journey/Journey';
import Footer from '$components/Home/Footer/Footer';
import { ROUTES } from '$constants/routes';
import { useAuth } from '$hooks/useAuth';

import './Home.css';
import '../../App.css';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // If the user is authenticated, redirect them to the courses journey home page
    if (isAuthenticated) {
      navigate(ROUTES.COURSES_JOURNEY.HOME);
    }
  }, [isAuthenticated, navigate]);

  const Login = async () => {
    navigate(ROUTES.SIGNIN);
  };

  const Courses = async () => {
    navigate(ROUTES.COURSES);
  };

  return (
    <div className="home">
      <Header />

      <main className="main">
        <Hero />
        <Introduction />
        <Sign />
        <Journey />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
