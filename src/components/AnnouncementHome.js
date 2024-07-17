import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Typography, Button, Container, Box } from '@mui/material';
import { fetchAnnouncementDetail, downloadAnnouncementFile } from '../actions/adminActions';
import './AnnouncementHome.css';
import Header from './Header';
import Message from './Message';

const AnnouncementDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { announcementDetail, error } = useSelector(state => state.announcement);

  useEffect(() => {
    dispatch(fetchAnnouncementDetail(id));
  }, [dispatch, id]);

  const handleDownload = () => {
    dispatch(downloadAnnouncementFile(id,announcementDetail));
  };

  if (!announcementDetail) return <p>Loading...</p>;

  return (
    <div>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      {error && <Message variant="danger">{error.message}</Message>}
      <Header />
      <Container maxWidth="md" className="announcement-details">
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
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AnnouncementDetails;
