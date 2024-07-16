import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPayments, downloadPaymentFile } from '../../actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Paper, Button, Grid } from '@mui/material';
import './UserPayments.css';
import Message from '../Message'

const UserPayments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userPayments, loading,error } = useSelector(state => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserPayments(id));
  }, [dispatch, id]);
  console.log(userPayments)
  const handleDownloadFile = (paymentId) => {
    dispatch(downloadPaymentFile(paymentId,null));
  };

  if (loading) return <p>Loading...</p>;

  if (!userPayments || userPayments.length === 0) return <p>No payments found for this user</p>;

  return (
    <Container maxWidth="lg" className="user-payments">
    {error && <Message variant="danger">{error.message}</Message>}
      <Typography variant="h4" gutterBottom>
        Payments
      </Typography>
      <Grid container spacing={2}>
        {userPayments.map(payment => (
          <Grid item key={payment._id} xs={12} sm={6}>
            <Paper className="payment-item" elevation={3}>
              <Typography variant="body1" component="div">
                <strong>Amount:</strong> {payment.amount}
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Description:</strong> {payment.description}
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Category:</strong> {payment.category}
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" component="div">
                <strong>Status:</strong> {payment.status}
              </Typography>
              {payment.screenshotURL && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownloadFile(payment._id)}
                  className="download-button"
                >
                  Download File
                </Button>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserPayments;
