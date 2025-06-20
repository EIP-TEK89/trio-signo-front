import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '$store/AuthSlice';
import { handleGoogleLogin } from "$utils/handleGoogleLogin"
import { SocialButton } from "$components/SocialButton/SocialButton"
import { API_ROUTES } from "$constants/routes"
import Cross from '$assets/Courses/cross.svg';
import ShowIcon from '$assets/SingInUp/show.svg';
import HideIcon from '$assets/SingInUp/hide.svg';
import './SignUp.css';

const SignUp: React.FC = () => {
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ age?: string; username?: string; email?: string; password?: string; apiError?: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const response = await fetch(API_ROUTES.signUp, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: parseInt(age),
          username,
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating account');
      }

      const data = await response.json();
      dispatch(setToken(data));
      navigate('/coursesJourney/home');
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
    }
  };

  return (
    <div className="login-modal flex-container flex-column align-center">
      <div className="header-buttons">
        <button onClick={() => navigate('/')} className="close-button">
          <img src={Cross} alt="Fermer" />
        </button>
        <button className="login-nav-button" onClick={() => navigate('/signin')}>Connexion</button>
      </div>
      <form className="login-form-container" onSubmit={(e) => e.preventDefault()}>
        <div>
          <h1 className="login-title">Créer ton profil</h1>
          <div className="login-form">
            <input
              type="number"
              placeholder="Âge"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="login-input"
            />
            <input
              type="text"
              placeholder="Nom (facultatif)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img 
                  src={showPassword ? HideIcon : ShowIcon} 
                  alt={showPassword ? "Hide password" : "Show password"} 
                  className="password-toggle-icon"
                />
              </button>
            </div>
            <button 
              type="button" 
              onClick={handleSignUp}
              className="login-button"
            >
              CRÉER UN COMPTE
            </button>
            <div className="divider">
              <span>OU</span>
            </div>
            <SocialButton className="google-icon" title="GOOGLE" onClick={handleGoogleLogin} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
