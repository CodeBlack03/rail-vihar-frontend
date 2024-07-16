import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail, deleteUser, updateUserStatus } from '../../actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Select, MenuItem, InputLabel, FormControl, CircularProgress, Box } from '@mui/material';
import './UserDetails.css';
import Message from '../Message'

const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading,error } = useSelector(state => state.admin);
  const [status, setStatus] = useState(user?.status || 'active');

  useEffect(() => {
    dispatch(fetchUserDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setStatus(user.status);
    }
  }, [user]);

  const handleEditProfile = () => {
    navigate(`/admin/users/${id}/edit`);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = () => {
    dispatch(updateUserStatus({id,status}));
  };

  const handleViewPayments = () => {
    navigate(`/admin/users/${id}/payments`);
  };

  const handleDeleteUser = () => {
    if (window.confirm("Do you really want to delete this user?")) {
      dispatch(deleteUser(id));
      navigate('/admin/users'); // Redirect to users list after deletion
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;

  if (!user) return <p>User not found</p>;

  return (
    <Container className="user-detail">
    {error && <Message variant="danger">{error.message}</Message>}
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>User Detail</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Status:</strong> {user.status}</p>
          <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          <p><strong>House Number:</strong> {user.houseNumber}</p>
          <p><strong>House Type:</strong> {user.houseType}</p>
          <p><strong>Dues:</strong> {user.dues}</p>

          {/* Add other user details here */}
          <Button variant="primary" onClick={handleEditProfile} className="mb-3">Edit Profile</Button>
          <Form inline className="mb-3">
            <FormControl fullWidth>
              <InputLabel htmlFor="status">Change Status</InputLabel>
              <Select
                id="status"
                value={status}
                onChange={handleStatusChange}
                fullWidth
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <Button variant="info" onClick={handleUpdateStatus} className="mt-2">Update Status</Button>
          </Form>
          <Button variant="secondary" onClick={handleViewPayments} className="mt-2">View Payments</Button>
          <Button variant="danger" onClick={handleDeleteUser} className="mt-2">Delete User</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetail;
