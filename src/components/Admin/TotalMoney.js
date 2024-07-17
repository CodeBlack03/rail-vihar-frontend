import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalMoney, editTotalMoney } from '../../actions/adminActions';
import { Typography, TextField, Button, Container, Box, Grid } from '@mui/material';
import './TotalMoney.css';
import Message from '../Message'

const TotalMoney = () => {
  const dispatch = useDispatch();
  const { totalMoney, loading,error } = useSelector(state => state.admin);
  const [newTotal, setNewTotal] = useState('');

  useEffect(() => {
    dispatch(fetchTotalMoney());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Do you really want to EDIT the TOTAL MONEY COLLECTED ?")) {
      dispatch(editTotalMoney(newTotal));
      setNewTotal("");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" className="total-money">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Total Money Collected
        </Typography>
        <div className="total-circle">
          <Typography variant="h5" className="total-amount">
            {totalMoney.totalAmount}
          </Typography>
        </div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              value={newTotal}
              onChange={(e) => setNewTotal(e.target.value)}
              placeholder="New Total Money"
              variant="outlined"
              fullWidth
              size="small"
              className="new-total-input"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="small"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TotalMoney;
