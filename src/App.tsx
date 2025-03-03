import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import HomePage from './pages/CoursesJourney/Home/Home';
import LiguePage from './pages/CoursesJourney/Ligue/Ligue';
import ProfilePage from './pages/CoursesJourney/Profile/Profile';
import TrainingPage from './pages/CoursesJourney/Training/Training';
import QuestsPage from './pages/CoursesJourney/Quests/Quests';
import ShopPage from './pages/CoursesJourney/Shop/Shop';
import SignUp from './pages/SignUp/SignUp';
//import LogIn from '$pages/LogIn/LogIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/coursesJourney/home" element={<HomePage />} />
        <Route path="/coursesJourney/quests" element={<QuestsPage />} />
        <Route path="/coursesJourney/league" element={<LiguePage />} />
        <Route path="/coursesJourney/profile" element={<ProfilePage />} />
        <Route path="/coursesJourney/training" element={<TrainingPage />} />
        <Route path="/coursesJourney/shop" element={<ShopPage />} />
      </Routes>
    </Router>
  );
};

export default App;
