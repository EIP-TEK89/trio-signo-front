import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '$store/AuthSlice';

import '$styles/LoginSignup.css';
import Logo from '$assets/logo.png';

import { getBaseUrl, getBaseUrlWithPort } from '$utils/getBaseUrl';

const LoginSignup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; apiError?: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConnection = async () => {
    try {

      const response = await fetch(getBaseUrl() + ":3000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating user');
      }

      const data = await response.json();
      console.log('User created successfully:', data);

      dispatch(setToken(data));

      navigate('/coursesJourney/home');

      console.log('User created successfully:', data);

      navigate('/coursesJourney/home');

    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
    }
  };

  return (
    <div className="login-signup-container">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <h2>Connexion</h2>
      <div className="form-group">
        <input
          type="username"
          placeholder="Surnom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="button-container">
        <button className="pushable" onClick={handleConnection}>
          <span className="front">
          Connexion
          </span>
        </button>
      </div>
      <p className="forgot-password">
        Déjà un compte ? <a href="/signin">Cliquez Ici</a>
      </p>
      {errors.apiError && <p className="api-error-message">{errors.apiError}</p>}
    </div>
  );
};

export default LoginSignup;
