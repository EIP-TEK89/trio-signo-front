import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cross from '$assets/Courses/cross.svg';
import './Login.css';

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
                throw new Error(errorData.message || 'Error logging in');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            navigate('/coursesJourney/home');
        } catch (error: any) {
            setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
        }
    };

    return (
        <div className="login-modal flex-container flex-column align-center">
            <div className="header-buttons">
                <button onClick={() => navigate('/')} className="close-button">
                    <img src={Cross} alt="Close" />
                </button>
                <button className="signup-button" onClick={() => navigate('/signup')}>S'inscrire</button>
            </div>
            <form className="login-form-container" method="POST" noValidate>
                <div>
                    <h1 className="login-title">Connexion</h1>
                    <div className="login-form">
                    <input
                        type="text"
                        placeholder="E-mail ou nom d'utilisateur"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                    />
                    <div className="password-container">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                        <span className="forgot-password">OUBLIÉ ?</span>
                    </div>
                    <button 
                        type="button" 
                        onClick={() => navigate('/coursesJourney/home')}
                        // onClick={handleConnection}
                        className="login-button"
                    >
                        SE CONNECTER
                    </button>
                    <div className="divider">
                        <span>OU</span>
                    </div>
                    <div className="social-buttons-row">
                        <button type="button" className="social-button facebook">
                            <span className="facebook-icon"></span>
                            FACEBOOK
                        </button>
                        <button type="button" className="social-button google">
                            <span className="google-icon"></span>
                            GOOGLE
                        </button>
                    </div>
                    </div>
                </div>
                <div className="form-section">
                    <div className="form-group">
                        <p className="form-text">
                            Vous n'avez pas de compte ?
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginSignin;
