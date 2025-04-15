import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '$components/Home/Header/Header';
import Hero from '$components/Home/Hero/Hero';
import Introduction from '$components/Home/Introduction/Introduction';
import Sign from '$components/Home/Sign/Sign';
import Journey from '$components/Home/Journey/Journey';
import Footer from '$components/Home/Footer/Footer';

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