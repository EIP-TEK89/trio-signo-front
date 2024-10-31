import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginSignup.css';
import Logo from '../Assets/logo.png';

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; apiError?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    navigate('/coursesJourney/home');
    // let validationErrors = {};

    // setErrors(validationErrors);

    // if (Object.keys(validationErrors).length > 0) return;

    // try {
    //   setLoading(true);
    //   const response = await fetch('http://localhost:5000/signup', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.message || 'Failed to sign up');
    //   }

    //   const data = await response.json();
    //   localStorage.setItem('token', data.token);
    //   console.log('Success:', data);
    //   navigate('/coursesJourney/home');
    // } catch (error: any) {
    //   setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const data = await response.json();
      console.log('Login success:', data);
    } catch (error: any) {
      setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
    } finally {
      setLoading(false);
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <p className="forgot-password">
        Lost Password? <a href="#">Click Here!</a>
      </p>
      <div className="button-container">
        <button className="pushable" onClick={handleSignUp}>
          <span className="front">
            Sign Up
          </span>
        </button>
        <button className="pushable" onClick={handleLogin}>
          <span className="front">
            Login
          </span>
        </button>
      </div>
      {errors.apiError && <p className="api-error-message">{errors.apiError}</p>}
    </div>
  );
};

export default LoginSignup;
