import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Courses from './pages/Courses/Courses';
import HomePage from './pages/CoursesJourney/Home/Home';
import DictionaryPage from './pages/CoursesJourney/Dictionary/Dictionary';
import LiguePage from './pages/CoursesJourney/Ligue/Ligue';
import ProfilePage from './pages/CoursesJourney/Profile/Profile';
import TrainingPage from './pages/CoursesJourney/Training/Training';
import QuestsPage from './pages/CoursesJourney/Quests/Quests';
import ShopPage from './pages/CoursesJourney/Shop/Shop';
import SignUp from './pages/SignUp/SignUp';
import SignRecon from '$pages/SignRecon/SignRecon';
import LogIn from './pages/LogIn/LogIn';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ROUTES } from './constants/routes';
import SignDetails from './components/SignDetails/SignDetails';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from './services/userServices';
import { setUser, setToken } from './Store/AuthSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Vérifier l'authentification au démarrage de l'application
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Vérifier si nous avons un token dans localStorage
        const token = localStorage.getItem('token');
        if (token) {
          // Vérifier le token en obtenant l'utilisateur courant
          const userData = await getCurrentUser();
          if (userData) {
            // Mettre à jour Redux avec les données utilisateur
            dispatch(setToken(token));
            dispatch(setUser(userData));
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error);
      } finally {
        // Toujours terminer le chargement après la vérification de l'auth
        setIsLoading(false);
      }
    };

    // Ajouter un petit délai pour s'assurer que les assets sont chargés
    const timer = setTimeout(() => {
      initAuth();
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Afficher un indicateur de chargement pendant l'initialisation
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div>Chargement de l'application...</div>
        <div style={{ marginTop: '10px' }}>TrioSigno</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />
        <Route path={ROUTES.SIGNIN} element={<LogIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path={ROUTES.COURSES} element={<Courses />} />
        <Route path={ROUTES.COURSES_LESSON} element={<Courses />} />
        
        {/* Routes protégées du parcours de cours */}
        <Route 
          path={ROUTES.COURSES_JOURNEY.HOME} 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.COURSES_JOURNEY.DICTIONARY} 
          element={
            <ProtectedRoute>
              <DictionaryPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={ROUTES.COURSES_JOURNEY.DICTIONARY_DETAILS} 
          element={
            <ProtectedRoute>
              <SignDetails />
            </ProtectedRoute>
          } 
        />

        <Route path={ROUTES.COURSES_JOURNEY.QUESTS} element={
          <ProtectedRoute>
            <QuestsPage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.COURSES_JOURNEY.LEAGUE} element={
          <ProtectedRoute>
            <LiguePage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.COURSES_JOURNEY.PROFILE} element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.COURSES_JOURNEY.TRAINING} element={
          <ProtectedRoute>
            <TrainingPage />
          </ProtectedRoute>
        } />
        <Route path={ROUTES.COURSES_JOURNEY.SHOP} element={
          <ProtectedRoute>
            <ShopPage />
          </ProtectedRoute>
        } />

        {/* 404 Page - Catch all unmatched routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
