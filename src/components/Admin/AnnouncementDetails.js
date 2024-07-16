import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Button,
  Container,
  Box,
} from '@mui/material';
import { deleteAnnouncement, fetchAnnouncementDetail, downloadAnnouncementFile } from '../../actions/adminActions';
import './AnnouncementDetails.css';
import Message from '../Message'

const AnnouncementDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { announcementDetail,error } = useSelector(state => state.announcement);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAnnouncementDetail(id));
  }, [dispatch, id]);

  const handleDownload = () => {
    dispatch(downloadAnnouncementFile(id,announcementDetail));
  };

  const handleDelete = () => {
    dispatch(deleteAnnouncement(id));
    navigate('/admin/announcements'); // Redirect to announcements list after deletion
  };

  if (!announcementDetail) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" className="announcement-details">
    {error && <Message variant="danger">{error.message}</Message>}

      <Box textAlign="center" marginBottom={2}>
        <Typography variant="h4" gutterBottom>
          {announcementDetail.name}
        </Typography>
        <Typography variant="body1">
          {announcementDetail.description}
        </Typography>
        {announcementDetail.fileURL && (
          <Box marginTop={2} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleDownload}
              sx={{ width: 'fit-content', marginRight: '10px' }}
            >
              Download File
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={handleDelete}
              sx={{ width: 'fit-content' }}
            >
              Delete File
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default AnnouncementDetails;
