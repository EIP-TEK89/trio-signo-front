import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import Logo from '../Assets/logo.png';

const LoginSignin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; apiError?: string }>({});
    const navigate = useNavigate();

    const handleConnection = async () => {
        try {
    
          const response = await fetch("http://localhost:3000/api/auth/log-in", {
            method: "POST",
            headers: {
              "accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
            <p className="forgot-password">
                Mot de passe oublié ? <a href="#">Clicker Ici</a>
            </p>
            <div className="button-container">
                <button className="pushable" onClick={handleConnection}>
                    <span className="front">
                        Connection
                    </span>
                </button>
            </div>
            <p className="forgot-password">
                Créer un nouveau compte <a href="/signup">Ici</a>
            </p>
            {errors.apiError && <p className="api-error-message">{errors.apiError}</p>}
        </div>
    );
};

export default LoginSignin;
