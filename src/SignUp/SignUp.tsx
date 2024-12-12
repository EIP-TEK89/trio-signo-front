import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '../Store/AuthSlice';
import { UserCredentials } from '../types/User';
import { ErrorCredentials } from '../types/Error';
import '../styles/LoginSignup.css';
import Logo from '../Assets/logo.png';

const SignUp: React.FC = () => {
  const [credentials, setCredentials] = React.useState<UserCredentials>({
    email: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState<ErrorCredentials>({});
};

export default SignUp;
