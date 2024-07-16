import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,useLocation  } from 'react-router-dom';
import { fetchUsers, downloadUsersCSV } from '../../actions/adminActions';
import { Container, Row, Col, Form, Button, Table, Spinner, Pagination } from 'react-bootstrap';
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Box } from '@mui/material';
import './UsersList.css';
import Message from '../Message'


const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // React Router's useLocation hook
  const { users, loading, metaData,error} = useSelector(state => state.admin);
  const [keyword, setKeyword] = useState('');
  const [houseType, setHouseType] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('-dues');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const currentPage = location.state ? location.state.page : 1;
    setPage(currentPage);
    dispatch(fetchUsers({ keyword, houseType, status, sort, page:currentPage }));
  }, [dispatch, houseType, status, sort, location.state]);

  const handleUserClick = (id) => {
    navigate(`/admin/users/${id}`);
  };

  const handleDownloadCSV = () => {
    dispatch(downloadUsersCSV());
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleHouseTypeChange = (e) => {
    setHouseType(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
const navigatePage = (pageNumber) => {
    setPage(pageNumber);
    navigate(`/admin/users?page=${pageNumber}`, { state: { page: pageNumber } });
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1); // Reset page to 1 when performing a new search
    dispatch(fetchUsers({ keyword, houseType, status, sort, page: 1 }));
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  return (
    <Container className="users-list">
    {error && <Message variant="danger">{error.message}</Message>}
      <h2>All Users</h2>
      <Row className="controls">
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by Name"
            value={keyword}
            onChange={handleSearchChange}
          />
        </Col>
        <Col md={2}>
          <Button variant="primary" onClick={handleSearch}>Search</Button>
        </Col>
        <Col md={2}>
          <FormControl fullWidth>
            <InputLabel>House Type</InputLabel>
            <Select value={houseType} onChange={handleHouseTypeChange}>
              <MenuItem value="">All House Types</MenuItem>
              <MenuItem value="2">Type 2</MenuItem>
              <MenuItem value="3">Type 3</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col md={2}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={handleStatusChange}>
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col md={3}>
          <FormControl fullWidth>
            <InputLabel></InputLabel>
            <Select value={sort} onChange={handleSortChange}>
              <MenuItem value="dues">Sort by Dues (asc)</MenuItem>
              <MenuItem value="-dues">Sort by Dues (desc)</MenuItem>
            </Select>
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button variant="success" className="download-csv" onClick={handleDownloadCSV}>Download Excel</Button>
        </Col>
      </Row>
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
      <Table striped bordered hover className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>House Number</th>
            <th>House Type</th>
            <th>Dues</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="user-item" onClick={() => handleUserClick(user._id)}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobileNumber}</td>
              <td>{user.houseNumber}</td>
              <td>{user.houseType}</td>
              <td>{user.dues}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </Container>
  );
};

export default UsersList;
