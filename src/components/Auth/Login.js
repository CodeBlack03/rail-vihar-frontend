import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../../actions/authActions'; // Implement this action
import './Login.css';
import Message from '../Message'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const {error} = useSelector(state=>state.auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      // navigate('/dashboard'); // Use navigate to redirect
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="Login">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <h1>Login</h1>
      {error && <Message variant="danger">{error.message}</Message>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
