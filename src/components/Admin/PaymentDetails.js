import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePayment, fetchPaymentDetail, downloadPaymentFile } from '../../actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import './PaymentDetails.css';
import Message from '../Message'

const PaymentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { paymentDetail, loading, error } = useSelector(state => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!paymentDetail) {
      dispatch(fetchPaymentDetail(id));
    }
  }, [dispatch, id, paymentDetail]);

  const handleDownloadFile = () => {
    dispatch(downloadPaymentFile(id,paymentDetail));
  };

  const handleDeletePayment = () => {
    if (window.confirm("Do you really want to delete this payment?")) {
      dispatch(deletePayment(id));
      navigate('/admin/payments'); // Redirect to payments list after deletion
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>{error}</Typography>;
  if (!paymentDetail) return <Typography>Payment not found</Typography>;

  return (
    <Container maxWidth="md" className="payment-detail">
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" gutterBottom align="center">
        Payment Detail
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
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{paymentDetail.user.name}</TableCell>
              <TableCell>{paymentDetail.user.houseNumber}</TableCell>
              <TableCell>{paymentDetail.user.houseType}</TableCell>
              <TableCell>{paymentDetail.amount}</TableCell>
              <TableCell>{paymentDetail.description}</TableCell>
              <TableCell>{paymentDetail.category}</TableCell>
              <TableCell>{paymentDetail.status}</TableCell>
              <TableCell>{new Date(paymentDetail.date).toLocaleDateString()}</TableCell>
              <TableCell>
                {paymentDetail.screenshotURL && (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleDownloadFile}
                    className="download-button"
                  >
                    Download File
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeletePayment}
          className="delete-button"
        >
          Delete Payment
        </Button>
      </Box>
    </Container>
  );
};

export default PaymentDetail;
