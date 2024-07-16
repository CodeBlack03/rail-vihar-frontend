import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Profile from './Profile';
import Payments from './Payments';
import PaymentDetail from './PaymentDetails';
import MakePayment from './MakePayment';
import Expenditures from './Expenditures';
import ExpenditureDetails from './ExpenditureDetails';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import Earnings from './Earnings';
import UserHeader from './UserHeader';
import Logout from './Logout';
import axios from 'axios';
import Button from '@mui/material/Button';
import UserSidebar from './UserSidebar'; // Corrected import
import { styled } from '@mui/material/styles';
import './Dashboard.css';
import Message from '../Message'
import baseURL from '../../URL'

const Dashboard = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const {error}  = useSelector(state=>state.auth)
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`);
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="dashboard">
     {error && <Message variant="danger">{error.message}</Message>}
      <div className="sidebar">
        <UserSidebar handleLogout={handleLogout} />
      </div>
      <div className="content">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/make-payment" element={<MakePayment />} />
          <Route path="/expenditures" element={<Expenditures />} />
          <Route path="/expenditures/:id" element={<ExpenditureDetails />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/payment/:id" element={<PaymentDetail />} />
          <Route path="/earnings" element={<Earnings />} />
          <Route path="/" element={<Navigate to="/dashboard/profile" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
