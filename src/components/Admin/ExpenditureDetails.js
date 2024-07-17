import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchExpenditureDetail, deleteExpenditure, downloadExpenditureFile } from '../../actions/expenditureActions';
import { Card, CardContent, Typography, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GetAppIcon from '@mui/icons-material/GetApp';
import './ExpenditureDetails.css';
import Message from '../Message'

const ExpenditureDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { expenditure, loading, error } = useSelector(state => state.expenditures);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchExpenditureDetail(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expenditure?')) {
      dispatch(deleteExpenditure(id));
      navigate('/admin/expenditures');
    }
  };

  const handleEditFile = () => {
    navigate(`/admin/expenditures/${id}/edit`);
  };

  const handleDownloadFile = () => {
    dispatch(downloadExpenditureFile(id,expenditure));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!expenditure) return <p>Expenditure not found</p>;

  return (
    <Card className="expenditure-details">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Expenditure Detail
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Category:</strong></TableCell>
                <TableCell>{expenditure.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Description:</strong></TableCell>
                <TableCell>{expenditure.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Amount:</strong></TableCell>
                <TableCell>{expenditure.amount}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Date:</strong></TableCell>
                <TableCell>{new Date(expenditure.date).toLocaleDateString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className="buttons-container">
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEditFile}
          >
            Edit
          </Button>
          {expenditure.filePath && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<GetAppIcon />}
              onClick={handleDownloadFile}
            >
              Download File
            </Button>
          )}
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenditureDetails;
