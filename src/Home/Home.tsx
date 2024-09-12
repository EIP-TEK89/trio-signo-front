import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Lesson Page</h1>
      <p>This is the lesson page, but you need to be authenticated to view it.</p>
    </div>
  );
};

export default Home;
