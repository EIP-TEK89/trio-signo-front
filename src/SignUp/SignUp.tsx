import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../Store/AuthSlice';
import { UserCredentials } from '../types/User';
import { ErrorCredentials } from '../types/Error';
import { signUpUser } from '../services/userServices';
import { isApiError } from '../services/isApiError';
import '../styles/LoginSignup.css';
import Logo from '../assets/logo.png';

const SignUp: React.FC = () => {
  const [credentials, setCredentials] = React.useState<UserCredentials>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<ErrorCredentials>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConnection = async () => {
    try {
      const data = await signUpUser(credentials);
      console.log('User created successfully:', data);

      dispatch(setToken(data));

      navigate('/coursesJourney/home');
    } catch (error: unknown) {
      if (isApiError(error)) {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
      } else if (error instanceof Error) {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: 'Une erreur inattendue est survenue' }));
      }
    }
  };

  return (
    <div className="login-signup-container">
      <div className="logo">
        <img src={Logo} alt="Logo" className="logo" />
      </div>
      <h2>Connection</h2>
      <div className="form-group">
        <input
          type="username"
          placeholder="Surnom"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="button-container">
        <button className="pushable" onClick={handleConnection}>
          <span className="front">Connection</span>
        </button>
      </div>
      <p className="forgot-password">
        Déjà un compte ? <a href="/signin">Clicker Ici</a>
      </p>
      {errors.apiError && <p className="api-error-message">{errors.apiError}</p>}
    </div>
  );
};

export default SignUp;
