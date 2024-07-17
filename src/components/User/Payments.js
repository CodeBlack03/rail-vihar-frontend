



// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { fetchPayments } from '../../actions/paymentActions';
// import { Button, InputLabel, MenuItem, Select } from '@mui/material';
// import { styled } from '@mui/material/styles';

// import './Payments.css';

// const Payments = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const auth = useSelector(state => state.auth);
//   const { payments, metaData } = useSelector(state => state.payments);
//   const [filterDate, setFilterDate] = useState({ startDate: '', endDate: '' });
//   const [category, setFilterCategory] = useState('');
//   const [sort, setSortOrder] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (auth) {
//       dispatch(fetchPayments({ startDate, endDate, category, sort, page }));
//     } else {
//       navigate('/login');
//     }
//   }, [dispatch, auth.user, startDate, endDate, category, sort, page]);

//   const handleFilterDateChange = (e) => {
//     setFilterDate({ ...filterDate, [e.target.name]: e.target.value });
//   };

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   const handlePaymentClick = (id) => {
//     navigate(`/dashboard/payment/${id}`);
//   };

//   if (!payments) return <p>Loading...</p>;

//   // StyledButton to override default Button behavior
//   const StyledButton = styled(Button)(({ theme }) => ({
//     '&:hover': {
//       backgroundColor: theme.palette.primary.dark,
//     },
//     color: 'white',
//   }));

//   return (
//     <div className="payments">
//       <h2>My Payments</h2>
//       <div className="filters">
//         <div className="filter-item">
//           <InputLabel id="category-label">Category:</InputLabel>
//           <Select
//             labelId="category-label"
//             id="category"
//             value={category}
//             onChange={(e) => setFilterCategory(e.target.value)}
//           >
//             <MenuItem value="">All</MenuItem>
//             <MenuItem value="maintenance">Maintenance</MenuItem>
//             <MenuItem value="NOC Fund">NOC Fund</MenuItem>
//             <MenuItem value="other">Other</MenuItem>
//           </Select>
//         </div>
//         <div className="filter-item">
//           <InputLabel id="sortOrder-label">Sort By Dues:</InputLabel>
//           <Select
//             labelId="sortOrder-label"
//             id="sortOrder"
//             value={sort}
//             onChange={(e) => setSortOrder(e.target.value)}
//           >
//             <MenuItem value="-amount">Descending</MenuItem>
//             <MenuItem value="amount">Ascending</MenuItem>
//           </Select>
//         </div>
//         <div className="filter-item">
//           <InputLabel id="start-date-label">Start Date:</InputLabel>
//           <input
//             type="date"
//             id="start-date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="date-input"
//           />
//         </div>
//         <div className="filter-item">
//           <InputLabel id="end-date-label">End Date:</InputLabel>
//           <input
//             type="date"
//             id="end-date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="date-input"
//           />
//         </div>
//       </div>
//       <div className="payment-list">
//         {payments.length > 0 ? (
//           payments.map((payment) => (
//             <div key={payment._id} className="payment-item" onClick={() => handlePaymentClick(payment._id)}>
//               <div className="payment-details-row">
//                 <div className="payment-detail">
//                   <strong>Amount:</strong> {payment.amount}
//                 </div>
//                 <div className="payment-detail">
//                   <strong>Description:</strong> {payment.description && payment.description.length > 10 ? payment.description.split(" ").slice(0, 20).join(" ") : payment.description}...
//                 </div>
//                 <div className="payment-detail">
//                   <strong>Category:</strong> {payment.category}
//                 </div>
//                 <div className="payment-detail">
//                   <strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}
//                 </div>
//                 <div className="payment-detail">
//                   <strong>Status:</strong> {payment.status}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No payments found</p>
//         )}
//       </div>
//       {metaData && metaData.pagination && (
//         <div className="pagination">
//           {metaData.pagination.page > 1 && (
//             <StyledButton onClick={() => handlePageChange(metaData.pagination.page - 1)} variant="contained" color="primary">
//               Previous
//             </StyledButton>
//           )}
//           <span>Page {metaData.pagination.page} of {metaData.pagination.pages}</span>
//           {metaData.pagination.page < metaData.pagination.pages && (
//             <StyledButton onClick={() => handlePageChange(metaData.pagination.page + 1)} variant="contained" color="primary">
//               Next
//             </StyledButton>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Payments;




import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { fetchPayments } from '../../actions/paymentActions';
import { Pagination } from 'react-bootstrap';
import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Message from '../Message'
import './Payments.css';

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router's useLocation hook
  const auth = useSelector(state => state.auth);
  const { payments, metaData,error } = useSelector(state => state.payments);
  const [filterDate, setFilterDate] = useState({ startDate: '', endDate: '' });
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [status,setStatus] = useState("");

  useEffect(() => {
    if (auth) {
      const currentPage = location.state ? location.state.page : 1;
      setPage(currentPage);
      dispatch(fetchPayments({ startDate, endDate, category, sort, page:currentPage,status }));
    } else {
      navigate('/login');
    }
  }, [dispatch, auth, startDate, endDate, category, sort, page,status]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const navigatePage = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/dashboard/payments?page=${pageNumber}`, { state: { page: pageNumber } });
  };

  const handlePaymentClick = (id) => {
    navigate(`/dashboard/payment/${id}`);
  };

  if (!payments) return <p>Loading...</p>;

  // StyledButton to override default Button behavior
  const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
    color: 'white',
  }));
  // Calculate the total amount of all earnings displayed
  const totalAmount = payments.reduce((acc, payment) => acc + payment.amount, 0);
  return (
    <div className="payments">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" gutterBottom>
        My Payments
      </Typography>
      <Grid container spacing={2} className="filters">
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel id="category-label">Category:</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="maintenance">Maintenance</MenuItem>
            <MenuItem value="NOC Fund">NOC Fund</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Grid>
         <Grid item xs={12} sm={6} md={3}>
          <InputLabel id="status-label">Status:</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel id="sort-label">Sort By:</InputLabel>
          <Select
            labelId="sort-label"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            fullWidth
          >
            <MenuItem value="-amount">Des Amt</MenuItem>
            <MenuItem value="amount">Asc Amt</MenuItem>
            <MenuItem value="-date">Des Date</MenuItem>
            <MenuItem value="date">Asc Date</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel id="start-date-label">Start Date:</InputLabel>
          <TextField
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            className="date-input"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <InputLabel id="end-date-label">End Date:</InputLabel>
          <TextField
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            className="date-input"
          />
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
      <TableContainer component={Paper} className="payment-list">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <TableRow key={payment._id} className="payment-item" onClick={() => handlePaymentClick(payment._id)}>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.description && payment.description.length > 10 ? payment.description.split(" ").slice(0, 20).join(" ") : payment.description}...</TableCell>
                  <TableCell>{payment.category}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>No payments found</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={1}></TableCell>
              <TableCell className="total-amount-cell"><strong>Total Amount: {totalAmount}</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* {metaData && metaData.pagination && (
        <div className="pagination">
          {metaData.pagination.page > 1 && (
            <StyledButton onClick={() => handlePageChange(metaData.pagination.page - 1)} variant="contained" color="primary">
              Previous
            </StyledButton>
          )}
          <span>Page {metaData.pagination.page} of {metaData.pagination.pages}</span>
          {metaData.pagination.page < metaData.pagination.pages && (
            <StyledButton onClick={() => handlePageChange(metaData.pagination.page + 1)} variant="contained" color="primary">
              Next
            </StyledButton>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Payments;
