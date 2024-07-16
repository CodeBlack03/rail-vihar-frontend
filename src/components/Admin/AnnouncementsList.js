import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncements, fetchAnnouncementDetail } from '../../actions/adminActions';
import { Link, useNavigate } from 'react-router-dom';
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
  Container,
  Box,
} from '@mui/material';
import { Pagination } from 'react-bootstrap';
import './AnnouncementsList.css';
import Message from '../Message'


const AnnouncementsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page,setPage] = useState("")
  const { announcements, loading, metaData ,error} = useSelector(state => state.announcement);

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleAnnouncementClick = (id) => {
    dispatch(fetchAnnouncementDetail(id));
    navigate(`/admin/announcements/${id}`);
  };

  const handlePostAnnouncementClick = () => {
    navigate('/admin/announcements/post');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" className="announcements-list">
    {error && <Message variant="danger">{error.message}</Message>}

      <Box textAlign="center" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          All Announcements
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="post-announcement-button"
          onClick={handlePostAnnouncementClick}
        >
          Post Announcement
        </Button>
      </Box>
      {metaData && metaData.pagination && (
        <Pagination className="pagination">
          {metaData.pagination.page > 1 && (
            <Pagination.Prev onClick={() => setPage(prevPage => prevPage - 1)}>Previous</Pagination.Prev>
          )}
          <Pagination.Item active>{`Page ${metaData.pagination.page} of ${metaData.pagination.pages}`}</Pagination.Item>
          {metaData.pagination.page < metaData.pagination.pages && (
            <Pagination.Next onClick={() => setPage(prevPage => prevPage + 1)}>Next</Pagination.Next>
          )}
        </Pagination>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Subject</b></TableCell>
              <TableCell><b>Description</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {announcements.map((announcement) => (
              <TableRow
                key={announcement._id}
                className="announcement-item"
                onClick={() => handleAnnouncementClick(announcement._id)}
              >
                <TableCell>{announcement.name}</TableCell>
                <TableCell>
                  {announcement.description &&
                  announcement.description.length > 10
                    ? `${announcement.description
                        .split(' ')
                        .slice(0, 20)
                        .join(' ')}...`
                    : announcement.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {metaData && metaData.pagination && (
        <div className="pagination">
          {metaData.pagination.page > 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((prevPage) => prevPage - 1)}
            >
              Previous
            </Button>
          )}
          <span>
            Page {metaData.pagination.page} of {metaData.pagination.pages}
          </span>
          {/* {metaData.pagination.page < metaData.pagination.pages && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage((prevPage) => prevPage + 1)}
            >
              Next
            </Button>
          )} */}
        </div>
      )}
    </Container>
  );
};

export default AnnouncementsList;
