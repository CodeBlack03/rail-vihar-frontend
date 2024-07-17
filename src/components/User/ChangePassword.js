import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../actions/changePasswordActions';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';
import Message from '../Message'
const ChangePassword = () => {
  const dispatch = useDispatch();
  const changePasswordState = useSelector(state => state.changePassword);
  const {error}  = useSelector(state=>state.changePassword)
  const [oldPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    const passwordData = {
      oldPassword,
      newPassword,
      confirmNewPassword
    };

    dispatch(changePassword(passwordData));

    // Optionally, clear form fields after successful submission
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    navigate('/login')
  };

  return (
    <div className="change-password">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
     {error && <Message variant="danger">{error.message}</Message>}
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="oldPassword">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {changePasswordState.error && <p className="error-message">{changePasswordState.error}</p>}
    </div>
  );
};

export default ChangePassword;
