import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/authActions'; // Implement this action
import './ForgotPassword.css';
import Message from '../Message'

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const {error}  = useSelector(state=>state.forgotPassword)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword({ email }));
      //alert('Password reset link sent to your email');
    } catch (err) {
      //alert(`Forgot password failed: ${err.message}`);
    }
  };
  return (
    <div className="ForgotPassword">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}
      <h1>Forgot Password</h1>
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
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
