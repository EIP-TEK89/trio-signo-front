import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../constants/routes';
import { getCurrentUser } from '../../services/userServices';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, token, setSession, clearSession } = useAuth();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Check authentication on mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Si nous n'avons pas de token dans le state, vérifier le localStorage
        const localToken = localStorage.getItem('token');

        if (!token && !localToken) {
          // Pas de token, terminer la vérification
          setIsVerifying(false);
          return;
        }

        // Utiliser le token actuel ou celui du localStorage
        const currentToken = token || localToken;

        // Vérifier le token en faisant un appel API pour obtenir l'utilisateur courant
        const userData = await getCurrentUser();

        if (userData) {
          // Si nous avons récupéré les données utilisateur, le token est valide
          // S'assurer que Redux et localStorage sont synchronisés
          if (userData && localToken) {
            setSession(localToken, userData, localStorage.getItem('refreshToken') || undefined);
          }
          setIsValid(true);
        } else {
          // Token invalide, effacer les données d'authentification
          clearSession();
          setIsValid(false);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        // En cas d'erreur, effacer les données d'authentification
        clearSession();
        setIsValid(false);
      } finally {
        setIsVerifying(false);
      }
    };

    // Ajouter un petit délai pour s'assurer que les assets sont chargés
    const timer = setTimeout(() => {
      verifyToken();
    }, 200);

    return () => clearTimeout(timer);
  }, [token, clearSession, setSession]);

  // Afficher un spinner pendant la vérification
  if (isVerifying) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <div className="loading-spinner">Vérification de l'authentification...</div>
      </div>
    );
  }

  // Si le token n'est pas valide ou l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated || !isValid) {
    return <Navigate to={ROUTES.SIGNIN} state={{ from: location.pathname }} replace />;
  }

  // Si authentifié et token valide, afficher les enfants
  return <>{children}</>;
};

export default ProtectedRoute;
