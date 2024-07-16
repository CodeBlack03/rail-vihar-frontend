import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import AdminLogin from './components/Auth/AdminLogin';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import Documents from './components/Documents';
import Dashboard from './components/User/Dashboard';
import setAuthToken from './utils/setAuthToken'; // Import the setAuthToken function
import AdminDashboard from './components/Admin/AdminDashboard';
import AnnouncementHome from './components/AnnouncementHome';
import AdminProfile from './components/Admin/AdminProfile';
import UsersList from './components/Admin/UsersList';
import UserDetail from './components/Admin/UserDetails';
import PendingPayments from './components/Admin/PendingPayments';
import TotalMoney from './components/Admin/TotalMoney';
import EditUserProfile from './components/Admin/EditUserProfile';
import UserPayments from './components/Admin/UserPayments';
import AnnouncementsList from './components/Admin/AnnouncementsList';
import AnnouncementsDetails from './components/Admin/AnnouncementDetails';
import PostAnnouncement from './components/Admin/PostAnnouncement';
import Payments from './components/Admin/Payments';
import PaymentDetail from './components/Admin/PaymentDetails';
import DocumentsList from './components/Admin/DocumentsList';
import DocumentDetails from './components/Admin/DocumentDetails';
import PostDocument from './components/Admin/PostDocument';
import HomeDocumentDetails from './components/DocumentDetails';
import ExpendituresList from './components/Admin/ExpendituresList';
import ExpenditureDetails from './components/Admin/ExpenditureDetails';
import EditExpenditureForm from './components/Admin/EditExpenditureForm';
import PostExpenditureForm from './components/Admin/PostExpenditureForm';
import EarningsList from './components/Admin/EarningsList';
import EarningDetails from './components/Admin/EarningDetails';
import EditEarningForm from './components/Admin/EditEarningForm';
import PostEarningForm from './components/Admin/PostEarningForm';
import ExpenditureDetailsUser from './components/User/ExpenditureDetails';
import ResetPassword from './components/ResetPassword'
import Team from './components/Auth/Team'
import { ThemeProvider, createTheme } from '@mui/material/styles';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const theme = createTheme();
const App = () => {
  useEffect(() => {
    // Check for token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Set token in Axios headers
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path = "/admin-login" element={<AdminLogin/>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path = "/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
          <Route path = "/documents" element={<Documents></Documents>}></Route>
          <Route path = "/announcements/:id" element={<AnnouncementHome></AnnouncementHome>}></Route>
          <Route path = "/documents/:id" element={<HomeDocumentDetails></HomeDocumentDetails>}></Route>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path='/team' element={<Team/>}></Route>
          {/* <Route path="/dashboard/expenditures/:id" element={<ExpenditureDetailsUser />} /> */}
          
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/reset/:token" element={<ResetPassword />} />
          
          {/* <Route path="/admin/profile" element={<AdminProfile />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/users/:id" element={<UserDetail />} />
            <Route path="/admin/users/:id/edit" element={<EditUserProfile />} />
            <Route path="/admin/payments" element={<Payments />} />
            <Route path="/admin/payments/:id" element={<PaymentDetail />} />
            <Route path="/admin/users/:id/payments" element={<UserPayments />} />
            <Route path="/admin/payments/pending" element={<PendingPayments />} />
            <Route path="/admin/total-money-collected" element={<TotalMoney />} />
            <Route path="/admin/announcements" element={<AnnouncementsList />} />
            <Route path="/admin/announcements/:id" element={<AnnouncementsDetails />} />
            <Route path="/admin/announcements/post" element={<PostAnnouncement />} />
            <Route path="/admin/documents" element={<DocumentsList />} />
            <Route path="/admin/documents/:id" element={<DocumentDetails />} />
            <Route path="/admin/documents/post" element={<PostDocument />} />
            <Route path="/admin/expenditures" element={<ExpendituresList/>}/>
            <Route path="/admin/expenditures/:id" element={<ExpenditureDetails/>}/>
            <Route path="/admin/expenditures/:id/edit" element={<EditExpenditureForm/>}/>
            <Route path="/admin/expenditures/post" element={<PostExpenditureForm/>}/>
            <Route path="/admin/earnings" element={<EarningsList/>}/>
            <Route path="/admin/earnings/:id" element={<EarningDetails/>}/>
            <Route path="/admin/earnings/:id/edit" element={<EditEarningForm/>}/>
            <Route path="/admin/earnings/post" element={<PostEarningForm/>}/> */}
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
};

export default App;
