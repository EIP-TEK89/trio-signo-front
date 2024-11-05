import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignup from './LoginSignup/LoginSignup';
import LoginSignin from './LoginSignup/LoginSignin';
import Home from './Home/Home';
import Courses from './Courses/Courses';
import CoursesJourneyHome from './CoursesJourney/Home/CoursesJourneyHome';
import CoursesJourneyCompetition from './CoursesJourney/Competition/CoursesJourneyCompetition';
import CoursesJourneyProfile from './CoursesJourney/Profile/CoursesJourneyProfile';
import CoursesJourneyTraining from './CoursesJourney/Training/CoursesJourneyTraining';
import CoursesJourneyQuests from './CoursesJourney/Quests/CoursesJourneyQuests';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/signin" element={<LoginSignin />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/coursesJourney/home" element={<CoursesJourneyHome />} />
        <Route path="/coursesJourney/profile" element={<CoursesJourneyProfile />} />
        <Route path="/coursesJourney/competition" element={<CoursesJourneyCompetition />} />
        <Route path="/coursesJourney/training" element={<CoursesJourneyTraining />} />
        <Route path="/coursesJourney/quests" element={<CoursesJourneyQuests />} />
      </Routes>
    </Router>
  );
};

export default App;

