import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchEarningDetail, downloadEarningFile, deleteEarning } from '../../actions/earningActions';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import './EarningDetails.css';
import Message from '../Message'


const EarningDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { earningDetail, loading, error } = useSelector(state => state.earnings);

  useEffect(() => {
    dispatch(fetchEarningDetail(id));
  }, [dispatch, id]);

  const handleDownloadFile = () => {
    dispatch(downloadEarningFile(id,earningDetail));
  };

  const handleDeleteEarning = () => {
    if (window.confirm("Are you sure you want to delete this earning?")) {
      dispatch(deleteEarning(id));
    }
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  if (!earningDetail) return <p>Earning not found</p>;

  return (
    <Card className="earning-details">
    {error && <Message variant="danger">{error.message}</Message>}

      <CardContent>
        <Typography variant="h5" gutterBottom>
          {earningDetail.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Category:</strong> {earningDetail.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Description:</strong> {earningDetail.description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Amount:</strong> {earningDetail.amount}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Date:</strong> {new Date(earningDetail.date).toLocaleDateString()}
        </Typography>
        <Grid container spacing={2} className="earning-actions">
          {earningDetail.screenshotURL && (
            <Grid item>
              <Button variant="contained" onClick={handleDownloadFile}>
                Download File
              </Button>
            </Grid>
          )}
          <Grid item>
            <Link to={`/admin/earnings/${id}/edit`}>
              <Button variant="contained">
                Edit Earning
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleDeleteEarning} color="error">
              Delete Earning
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EarningDetails;
