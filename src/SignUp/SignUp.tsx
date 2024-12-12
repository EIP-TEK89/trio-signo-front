import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../Store/AuthSlice';
import { UserCredentials } from '../types/User';
import { ErrorCredentials } from '../types/Error';
import { signUpUser } from '../services/userServices';
import '../styles/LoginSignup.css';
import Logo from '../Assets/logo.png';

const SignUp: React.FC = () => {
  const [credentials, setCredentials] = React.useState<UserCredentials>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<ErrorCredentials>({});
  const navigate = useNavigate();

  const handleConnection = async () => {
    try {
      const response = await signUpUser(credentials);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating user');
      }

      const data = await response.json();
      console.log('User created successfully:', data);

      const dispatch = useDispatch();
      dispatch(setToken(data));

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
      <h2>Connection</h2>
      <div className="form-group">
        <input type="username" placeholder="Surnom" value={username} onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <p className="error-message">{errors.username}</p>}
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
