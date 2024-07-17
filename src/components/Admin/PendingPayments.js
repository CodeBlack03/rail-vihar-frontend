import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingPayments, approvePayment, rejectPayment, fetchPaymentDetail } from '../../actions/adminActions';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import './PendingPayments.css';
import Message from '../Message'


const PendingPayments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pendingPayments, loading, error} = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(fetchPendingPayments());
  }, [dispatch]);

  const handleApprove = (id) => {
    dispatch(approvePayment(id))
      .then(() => {
        dispatch(fetchPendingPayments()); // Reload data after approval
      })
      .catch((error) => {
        window.alert('Error approving payment:', error);
        // Handle error as needed
      });
  };

  const handleReject = (id) => {
    dispatch(rejectPayment(id))
      .then(() => {
        dispatch(fetchPendingPayments()); // Reload data after rejection
      })
      .catch((error) => {
        window.alert('Error rejecting payment:', error);
        // Handle error as needed
      });
  };

  const handlePaymentClick = (id) => {
    dispatch(fetchPaymentDetail(id));
    navigate(`/admin/payments/${id}`);
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" className="pending-payments">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" gutterBottom align="center">
        Pending Payments
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>House Number</b></TableCell>
              <TableCell><b>House Type</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Approve</b></TableCell>
               <TableCell><b>Reject</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingPayments.map(payment => (
              <TableRow key={payment.paymentId} onClick={() => handlePaymentClick(payment.paymentId)} className="payment-item">
                <TableCell>{payment.name}</TableCell>
                <TableCell>{payment.houseNumber}</TableCell>
                <TableCell>{payment.houseType}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.description && payment.description.length > 10 ? `${payment.description.substring(0, 20)}...` : payment.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleApprove(payment.paymentId); }}
                    className="approve-button"
                  >
                    Approve
                  </Button>
                  </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={(e) => { e.stopPropagation(); handleReject(payment.paymentId); }}
                    className="reject-button"
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PendingPayments;
