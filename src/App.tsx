import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import HomePage from './pages/CoursesJourney/Home/Home';
import DictionaryPage from './pages/CoursesJourney/Dictionary/Dictionary';
import LetterDetails from './components/LetterDetails/LetterDetails';
import LiguePage from './pages/CoursesJourney/Ligue/Ligue';
import ProfilePage from './pages/CoursesJourney/Profile/Profile';
import TrainingPage from './pages/CoursesJourney/Training/Training';
import QuestsPage from './pages/CoursesJourney/Quests/Quests';
import ShopPage from './pages/CoursesJourney/Shop/Shop';
import SignUp from './pages/SignUp/SignUp';
import LogIn from '$pages/LogIn/LogIn';
import SignRecon from '$pages/SignRecon/SignRecon';
import LogIn from './pages/LogIn/LogIn';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants/routes';
import SignDetails from './components/SignDetails/SignDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-recon" element={<SignRecon />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNIN} element={<LogIn />} />
        <Route path={ROUTES.COURSES} element={<Courses />} />
        <Route path={ROUTES.COURSES_JOURNEY.HOME} element={<HomePage />} />
        <Route path={ROUTES.COURSES_JOURNEY.DICTIONARY} element={<DictionaryPage />} />
        <Route path={ROUTES.COURSES_JOURNEY.DICTIONARY_DETAILS} element={<SignDetails />} />
        <Route path={ROUTES.COURSES_JOURNEY.LETTER_DETAILS} element={<LetterDetails />} />
        
        {/* Protected Route for Quests */}
        {/* <Route
          path={ROUTES.COURSES_JOURNEY.QUESTS}
          element={
            <ProtectedRoute>
              <QuestsPage />
            </ProtectedRoute>
          }
        /> */}


        <Route path={ROUTES.COURSES_JOURNEY.QUESTS} element={<QuestsPage />}/>
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
