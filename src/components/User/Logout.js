import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../URL'
const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`);
      // Remove token from localStorage or cookies
      localStorage.removeItem('token');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
