import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAnnouncement } from '../../actions/adminActions';
import debounce from 'lodash.debounce'; // Import debounce from lodash

import {
  Typography,
  Container,
  TextField,
  TextareaAutosize,
  Button,
  Grid,
} from '@mui/material';
import Message from '../Message'


const Announcements = () => {
  const dispatch = useDispatch();
  const [announcement, setAnnouncement] = useState({
    name: '',
    description: '',
    file: null
  });
  // Debounced handler for description change
  const handleDescriptionChange = debounce((value) => {
    setAnnouncement({
      ...announcement,
      description: value
    });
  }); // Adjust debounce delay as needed (300ms in this example)

  const {error} = useSelector(state=>state.announcement)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('name', announcement.name);
    formData.append('description', announcement.description);
    formData.append('file', announcement.file);

    // Dispatch action to post announcement with form data
    dispatch(postAnnouncement(formData));

    // Reset form fields
    setAnnouncement({
      name: '',
      description: '',
      file: null
    });
  };

  const handleFileChange = (e) => {
    setAnnouncement({
      ...announcement,
      file: e.target.files[0]
    });
  };

  return (
    <Container maxWidth="md">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" align="center" gutterBottom>
        Post Announcement
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Subject"
              variant="outlined"
              fullWidth
              value={announcement.name}
              onChange={(e) => setAnnouncement({ ...announcement, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <textarea
              id="description"
              placeholder="Write your announcement description here"
              minRows={4}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
              value={announcement.description}
              onChange={(e) => handleDescriptionChange(e.target.value)} // Use debounced handler
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
              style={{ width: '100%', padding: '5px' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ borderRadius: '4px' }}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Announcements;
