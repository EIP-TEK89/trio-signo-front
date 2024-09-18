import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import Home from './Home/Home';
import Courses from './Courses/Courses';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default App;

