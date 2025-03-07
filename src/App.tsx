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
import LogIn from './pages/LogIn/LogIn';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants/routes';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNIN} element={<LogIn />} />
        <Route path={ROUTES.COURSES} element={<Courses />} />
        <Route path={ROUTES.COURSES_JOURNEY.HOME} element={<HomePage />} />
        
        {/* Protected Route for Quests */}
        <Route
          path={ROUTES.COURSES_JOURNEY.QUESTS}
          element={
            <ProtectedRoute>
              <QuestsPage />
            </ProtectedRoute>
          }
        />
        
        <Route path={ROUTES.COURSES_JOURNEY.LEAGUE} element={<LiguePage />} />
        <Route path={ROUTES.COURSES_JOURNEY.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.COURSES_JOURNEY.TRAINING} element={<TrainingPage />} />
        <Route path={ROUTES.COURSES_JOURNEY.SHOP} element={<ShopPage />} />
        
        {/* 404 Page - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
