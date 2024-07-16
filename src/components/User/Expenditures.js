import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenditures,fetchExpenditureDetail,downloadExpenditureFile } from '../../actions/expenditureActions';
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
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import './Expenditures.css';
import Message from '../Message'


const ExpendituresList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router's useLocation hook
  const { metaData, expenditures, loading,error } = useSelector(state => state.expenditures);
  const [keyword, setKeyword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const handleExpenditureClick =(id)=>{
    dispatch(fetchExpenditureDetail(id));
    navigate(`/dashboard/expenditures/${id}`);
  }
  const handleDownloadFile = (id) => {
    dispatch(downloadExpenditureFile(id));
  };
  useEffect(() => {
    const currentPage = location.state ? location.state.page : 1;
    setPage(currentPage);
    dispatch(fetchExpenditures({ keyword, startDate, endDate, sort, page:currentPage}));
  }, [dispatch, startDate, endDate, sort, location.state]);

  const navigatePage = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/dashboard/expenditures?page=${pageNumber}`, { state: { page: pageNumber } });
  };
  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    dispatch(fetchExpenditures({ keyword, startDate, endDate, sort, page: 1 }));
  };
  // Calculate the total amount of all earnings displayed
  const totalAmount = expenditures.reduce((acc, expenditure) => acc + expenditure.amount, 0);
  if (loading) return <p>Loading...</p>;

  return (
    <div className="expenditures-list">
     {error && <Message variant="danger">{error.message}</Message>}
      <Typography variant="h4" align="center" gutterBottom>
        All Expenditures
      </Typography>

      

      <div className="filters">
        <TextField
          className="search-input"
          label="Payment Category"
          variant="outlined"
          size="small"
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

        <TextField
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <FormControl variant="outlined" className="sort-by-select">
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Sort By' }}
          >
            <MenuItem value="">Sort By</MenuItem>
            <MenuItem value="amount">Amount Ascending</MenuItem>
            <MenuItem value="-amount">Amount Descending</MenuItem>
            <MenuItem value="date">Date Ascending</MenuItem>
            <MenuItem value="-date">Date Descending</MenuItem>
          </Select>
        </FormControl>

        {/* <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button> */}
      </div>
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
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenditures.map(expenditure => (
              <TableRow key={expenditure._id} className="expenditure-item">
                <TableCell onClick={() => handleExpenditureClick(expenditure._id)}>
                    {expenditure.category}
                </TableCell>
                <TableCell onClick={() => handleExpenditureClick(expenditure._id)}>{expenditure.description}</TableCell>
                <TableCell onClick={() => handleExpenditureClick(expenditure._id)}>{expenditure.amount}</TableCell>
                <TableCell onClick={() => handleExpenditureClick(expenditure._id)}>{new Date(expenditure.date).toLocaleDateString()}</TableCell>
                {/* <TableCell align="center">
                  {expenditure.filePath && (
                    <Button onClick={(event) => handleDownloadFile(expenditure._id, event)} variant="outlined">Download</Button>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2}></TableCell>
              <TableCell className="total-amount-cell"><strong>Total Amount: {totalAmount}</strong></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

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

export default ExpendituresList;
