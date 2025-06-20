import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '$hooks/useAuth';
import { get } from '$services/apiClient';
import { handleGoogleLogin } from "$utils/handleGoogleLogin"
import { SocialButton } from "$components/SocialButton/SocialButton"
import Cross from '$assets/Courses/cross.svg';
import Hide from '$assets/SingInUp/hide.svg';
import Show from '$assets/SingInUp/show.svg';
import './Login.css';

const LoginSignin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; apiError?: string }>({});

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, isAuthenticated, setSession } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/coursesJourney/home';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Check for token in URL (for OAuth callbacks)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    const errorParam = params.get('error');

    if (tokenFromUrl) {
      handleOAuthSuccess(tokenFromUrl);
    }

    if (errorParam) {
      setErrors((prev) => ({ ...prev, apiError: 'Authentication failed' }));
    }

    if (params.get('expired') === 'true') {
      setErrors((prev) => ({ ...prev, apiError: 'Your session has expired. Please log in again.' }));
    }
  }, [location.search]);

  // Show error from auth state
  useEffect(() => {
    if (error) {
      setErrors((prev) => ({ ...prev, apiError: error }));
    }
  }, [error]);
  const handleOAuthSuccess = async (token: string) => {
    try {
      // Réellement récupérer les informations de l'utilisateur avec le token
      const userInfo = await get(
        '/auth/me',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // Stocker le token et les informations de l'utilisateur
      setSession(token, userInfo.user);

      // Nettoyer l'URL et rediriger vers la page d'accueil
      navigate('/coursesJourney/home', { replace: true });
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      setErrors((prev) => ({ ...prev, apiError: 'Erreur lors de la connexion' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      newErrors.email = 'Veuillez saisir votre email';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Veuillez saisir votre mot de passe';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConnection = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Use the auth hook for login
    login({ email, password })
      .unwrap()
      .then(() => {
        // Navigate after successful login (if not already redirected by effect)
        navigate('/coursesJourney/home');
      })
      .catch((err: any) => {
        // Error handling is done by the effect watching auth error state
        console.error('Login error:', err);
      });
  };

  return (
    <div className="login-modal flex-container flex-column align-center">
      <div className="header-buttons">
        <button onClick={() => navigate('/')} className="close-button">
          <img src={Cross} alt="Fermer" />
        </button>
        <button className="signup-button" onClick={() => navigate('/signup')}>
          S'inscrire
        </button>
      </div>
      <form className="login-form-container" onSubmit={handleConnection} noValidate>
        <div>
          <h1 className="login-title">Connexion</h1>
          {errors.apiError && <div className="error-message">{errors.apiError}</div>}
          <div className="login-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="E-mail ou nom d'utilisateur"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`login-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
            <div className="password-container">
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`login-input ${errors.password ? 'input-error' : ''}`}
                />
                <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
                  <img src={showPassword ? Hide : Show} alt="Afficher le mot de passe" />
                </button>
              </div>
              {errors.password && <div className="error-text">{errors.password}</div>}
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'CONNEXION...' : 'SE CONNECTER'}
            </button>
            <div className="divider">
              <span>OU</span>
            </div>
            <SocialButton title="GOOGLE" onClick={handleGoogleLogin} />
          </div>
        </div>
        <div className="form-section">
          <div className="form-group">
            <p className="form-text">
              Mot de passe oublié ? <a href="/signup">Cliquez ici</a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginSignin;
