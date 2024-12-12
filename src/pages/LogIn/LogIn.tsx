import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// local imports
import { setToken } from '../../store/AuthSlice';
import { isApiError } from '../../services/isApiError';
import { logInUser } from '../../services/userServices';

// styles
import '../../styles/LoginSignup.css';
import Logo from '../../assets/logo.png';

// types
import { UserCredentials } from '../../types/User';
import { ErrorCredentials } from '../../types/Error';

const LogIn: React.FC = () => {
  const [credentials, setCredentials] = React.useState<UserCredentials>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<ErrorCredentials>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConnection = async () => {
    try {
      const data = await logInUser(credentials);
      console.log('User connected successfully:', data);

      dispatch(setToken(data));

      navigate('/coursesJourney/home');
    } catch (error: unknown) {
      if (isApiError(error)) {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
      } else if (error instanceof Error) {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, apiError: 'An unknown error occured' }));
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

export default LogIn;
