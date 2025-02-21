import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import CoursesJourneyHome from './pages/CoursesJourney/Home/CoursesJourneyHome';
import CoursesJourneyCompetition from './pages/CoursesJourney/Competition/CoursesJourneyCompetition';
import CoursesJourneyProfile from './pages/CoursesJourney/Profile/CoursesJourneyProfile';
import CoursesJourneyTraining from './pages/CoursesJourney/Training/CoursesJourneyTraining';
import CoursesJourneyQuests from './pages/CoursesJourney/Quests/CoursesJourneyQuests';
import SignUp from './pages/SignUp/SignUp';
import LogIn from '$pages/LogIn/LogIn';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<LogIn />} />
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
