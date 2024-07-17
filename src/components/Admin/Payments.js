import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, fetchPaymentDetail, downloadPaymentFile } from '../../actions/adminActions';
import { useNavigate,useLocation } from 'react-router-dom';
import {Pagination } from 'react-bootstrap';

import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import './Payments.css';
import Message from '../Message'


const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router's useLocation hook
  const { payments, loading, error, metaData } = useSelector(state => state.admin);
  const [keyword, setKeyword] = useState('');
  const [houseType, setHouseType] = useState('');
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentPage = location.state ? location.state.page : 1;
    setPage(currentPage);
    dispatch(fetchPayments({ keyword, houseType, category, startDate, endDate, sort, page:currentPage }));
  }, [dispatch, location.state,houseType, category, startDate, endDate, sort]);

  const handlePaymentClick = (id) => {
    dispatch(fetchPaymentDetail(id));
    navigate(`/admin/payments/${id}`);
  };

  const handleDownloadFile = (id) => {
    dispatch(downloadPaymentFile(id));
  };
  const navigatePage = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/admin/payments?page=${pageNumber}`, { state: { page: pageNumber } });
  };
  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    dispatch(fetchPayments({ keyword, houseType, category, startDate, endDate, sort, page: 1 }));
  };
  // Calculate the total amount of all earnings displayed
  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>{error}</Typography>;

  return (
    <Container maxWidth="lg" className="payments">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" gutterBottom align="center">
        All Payments
      </Typography>
      <Grid container spacing={2} className="filters" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by Name"
            variant="outlined"
            fullWidth
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>House Type</InputLabel>
            <Select
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              label="House Type"
            >
              <MenuItem value="">Select House Type</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Start Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="End Date"
            type="date"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="NOC Fund">NOC Fund</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="">Sort By</MenuItem>
              <MenuItem value="amount">Amount Ascending</MenuItem>
              <MenuItem value="-amount">Amount Descending</MenuItem>
              <MenuItem value="date">Date Ascending</MenuItem>
              <MenuItem value="-date">Date Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} className="center">
          <Button variant="contained" color="primary" size="small" onClick={handleSearch} className="search-button">
            Search
          </Button>
        </Grid>
      </Grid>
      {metaData && metaData.pagination && (
        <Pagination className="pagination">
          {metaData.pagination.page > 1 && (
            <Pagination.Prev onClick={() => navigatePage(page - 1)}>Previous</Pagination.Prev>
          )}
          <Pagination.Item active>{`Page ${page} of ${metaData.pagination.pages}`}</Pagination.Item>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Pagination.Next onClick={() => navigatePage(page + 1)}>Next</Pagination.Next>
          )}
        </Pagination>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="payment-item-heading">
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>House Number</b></TableCell>
              <TableCell><b>House Type</b></TableCell>
              <TableCell><b>Amount</b></TableCell>
              <TableCell><b>Category</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Date</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments && payments.map(payment => (
              <TableRow key={payment._id} onClick={() => handlePaymentClick(payment._id)} className="payment-item">
                <TableCell>{payment.user.name}</TableCell>
                <TableCell>{payment.user.houseNumber}</TableCell>
                <TableCell>{payment.user.houseType}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.category}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {payment.file && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => { e.stopPropagation(); handleDownloadFile(payment._id); }}
                      className="download-button"
                    >
                      Download
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell className="total-amount-cell"><strong>Total Amount: {totalAmount}</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
        </Table>
      </TableContainer>
      {/* {metaData && metaData.pagination && (
        <Box className="pagination" display="flex" justifyContent="center" alignItems="center" mt={2}>
          {metaData.pagination.page > 1 && (
            <Button variant="contained" size="small" onClick={() => setPage(prevPage => prevPage - 1)} className="pagination-button">Previous</Button>
          )}
          <Typography variant="body2" style={{ margin: '0 10px' }}>Page {metaData.pagination.page} of {metaData.pagination.pages}</Typography>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Button variant="contained" size="small" onClick={() => setPage(prevPage => prevPage + 1)} className="pagination-button">Next</Button>
          )}
        </Box>
      )} */}
      
    </Container>
  );
};

export default Payments;
