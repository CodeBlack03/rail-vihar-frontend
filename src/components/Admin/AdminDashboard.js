import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminProfile from './AdminProfile';
import UsersList from './UsersList';
import UserDetail from './UserDetails';
import PendingPayments from './PendingPayments';
import TotalMoney from './TotalMoney';
import EditUserProfile from './EditUserProfile';
import UserPayments from './UserPayments';
import AnnouncementsList from './AnnouncementsList';
import Payments from './Payments';
import PaymentDetail from './PaymentDetails';
import './AdminDashboard.css';
import AnnouncementDetails from './AnnouncementDetails';
import PostAnnouncement from './PostAnnouncement';
import DocumentsList from './DocumentsList';
import DocumentDetails from './DocumentDetails';
import axios from 'axios';
import ExpendituresList from './ExpendituresList';
import ExpenditureDetails from './ExpenditureDetails';
import EditExpenditureForm from './EditExpenditureForm';
import PostExpenditureForm from './PostExpenditureForm';
import EarningsList from './EarningsList';
import EarningDetails from './EarningDetails';
import EditEarningForm from './EditEarningForm';
import PostEarningForm from './PostEarningForm';
import PostDocument from './PostDocument';
import Message from '../Message'
import baseURL from '../../URL'

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {error} =  useSelector(state=>state.auth)
  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/api/logout`);
      localStorage.removeItem('admin-token');
      navigate('/'); // Redirect to login page
    } catch (error) {
      <Message variant="danger">{`Logout Failed ${error.message}`}</Message>

      console.error('Logout failed', error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
    {error && <Message variant="danger">{error.message}</Message>}
      <AdminSidebar handleLogout={handleLogout} />
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <Routes>
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/users/:id/edit" element={<EditUserProfile />} />
          <Route path="/users/:id/payments" element={<UserPayments />} />

          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/:id" element={<PaymentDetail />} />
          <Route path="/payments/pending" element={<PendingPayments />} />

          <Route path="/total-money-collected" element={<TotalMoney />} />

          <Route path="/announcements" element={<AnnouncementsList />} />
          <Route path="/announcements/:id" element={<AnnouncementDetails />} />
          <Route path="/announcements/post" element={<PostAnnouncement />} />

          <Route path="/documents" element={<DocumentsList />} />
          <Route path="/documents/:id" element={<DocumentDetails />} />
          <Route path="/documents/post" element={<PostDocument />} />

          <Route path="/expenditures" element={<ExpendituresList />} />
          <Route path="/expenditures/:id" element={<ExpenditureDetails />} />
          <Route path="/expenditures/:id/edit" element={<EditExpenditureForm />} />
          <Route path="/expenditures/post" element={<PostExpenditureForm />} />

          <Route path="/earnings" element={<EarningsList />} />
          <Route path="/earnings/:id" element={<EarningDetails />} />
          <Route path="/earnings/:id/edit" element={<EditEarningForm />} />
          <Route path="/earnings/post" element={<PostEarningForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
