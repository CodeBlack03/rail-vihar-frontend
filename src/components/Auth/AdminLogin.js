import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin} from '../../actions/authActions'; // Implement this action
import './AdminLogin.css';
import Message from '../Message'
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error} = useSelector(state=>state.auth)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(adminLogin({ email, password }));
    } catch (err) {
      console.log("error aya",err);
     // <Message variant = "error">{error.message}</Message>
      // console.error('Admin login failed:', err);
    }
  };
  console.log("ADmin Login",error)

  return (
    <div className="AdminLogin">
      <h1>Admin Login</h1>
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

export default AdminLogin;
