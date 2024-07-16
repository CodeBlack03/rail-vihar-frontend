import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEarnings } from '../../actions/earningActions';
import { Link, useNavigate,useLocation  } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Typography,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './EarningsList.css';
import Message from '../Message'

const EarningsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router's useLocation hook
  const { earnings, loading, metaData,error } = useSelector(state => state.earnings);
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
    dispatch(fetchEarnings({ keyword, houseType, category, startDate, endDate, sort, page:currentPage }));
  }, [dispatch, category, startDate, endDate, sort,location.state]);

  const handleEarningClick = (id) => {
    navigate(`/admin/earnings/${id}`);
  };
  const navigatePage = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/admin/earnings?page=${pageNumber}`, { state: { page: pageNumber } });
  };
  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    dispatch(fetchEarnings({ keyword, houseType, category, startDate, endDate, sort, page: 1 }));
  };

  // Calculate the total amount of all earnings displayed
  const totalAmount = earnings.reduce((acc, earning) => acc + earning.amount, 0);

  return (
    <div className="earnings-list">
         {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" gutterBottom>
        All Earnings
      </Typography>
      <Grid container spacing={2} alignItems="center" className="filters">
        {/* <Grid item>
          <TextField
            type="text"
            placeholder="Search by Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid> */}
        <Grid item>
          <FormControl>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} displayEmpty>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="NOC Fund">NOC Fund</MenuItem>
              <MenuItem value="Interest">Interest</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <Select value={sort} onChange={(e) => setSort(e.target.value)} displayEmpty>
              <MenuItem value="">Sort By</MenuItem>
              <MenuItem value="amount">Amount Ascending</MenuItem>
              <MenuItem value="-amount">Amount Descending</MenuItem>
              <MenuItem value="date">Date Ascending</MenuItem>
              <MenuItem value="-date">Date Descending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {earnings.map(earning => (
              <TableRow key={earning._id} className="earning-item" onClick={() => handleEarningClick(earning._id)}>
                <TableCell>{earning.name}</TableCell>
                <TableCell>{earning.category}</TableCell>
                <TableCell>{earning.description}</TableCell>
                <TableCell>{earning.amount}</TableCell>
                <TableCell>{new Date(earning.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3}></TableCell>
              <TableCell className="total-amount-cell"><strong>Total Amount: {totalAmount}</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/admin/earnings/post">
        <Button variant="contained" color="primary" className="post-earning-btn">
          Post Earning
        </Button>
      </Link>
      {/* {metaData && metaData.pagination && (
        <div className="pagination">
          {metaData.pagination.page > 1 && (
            <Button onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Button>
          )}
          <span>Page {metaData.pagination.page} of {metaData.pagination.pages}</span>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Button onClick={() => setPage(prevPage => prevPage + 1)}>Next</Button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default EarningsList;
