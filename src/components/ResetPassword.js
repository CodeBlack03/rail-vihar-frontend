// components/auth/ResetPassword.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../actions/authActions';
import { Container, Button, Form } from 'react-bootstrap';
import { TextField, CircularProgress, Box, Typography } from '@mui/material';
import Message from './Message';
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.resetPassword);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, password, confirmPassword));
    setPassword('')
    setConfirmPassword('')
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  return (
    <Container className="reset-password">
      <Typography variant="h4" className="mb-3">Reset Password</Typography>
      {error && <Message variant="danger">{error.message}</Message>}
      {success && <Message variant="success">Password has been reset successfully</Message>}
      <Form onSubmit={handleSubmit} className="reset-password-form">
        <TextField
          label="New Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-3"
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-3"
        />
        <Button type="submit" variant="primary">Reset Password</Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
