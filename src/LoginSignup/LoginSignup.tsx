import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';

import Logo from '../Assets/Logo.png';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  return passwordRegex.test(password);
};

const LoginSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; apiError?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    let validationErrors = {};

    if (!isValidEmail(email)) {
      validationErrors = { ...validationErrors, email: 'Invalid email address' };
    }

    if (!isValidPassword(password)) {
      validationErrors = {
        ...validationErrors,
        password: 'Password must be at least 8 characters long and contain at least one number and one special character',
      };
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
      
    // Redirect to /lesson after successful sign up
    navigate('/lesson');

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
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
      </div>
      {errors.apiError && <p className="api-error-message">{errors.apiError}</p>}
    </div>
  );
};

export default LoginSignup;
