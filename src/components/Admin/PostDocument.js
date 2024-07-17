// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { postDocument } from '../../actions/adminActions';
// import './PostDocument.css';

// const PostDocument = () => {
//   const dispatch = useDispatch();
//   const [document, setDocument] = useState({
//     name: '',
//     description: '',
//     file: null
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', document.name);
//     formData.append('description', document.description);
//     formData.append('file', document.file);

//     dispatch(postDocument(formData));

//     setDocument({
//       name: '',
//       description: '',
//       file: null
//     });
//   };

//   const handleFileChange = (e) => {
//     setDocument({
//       ...document,
//       file: e.target.files[0]
//     });
//   };

//   return (
//     <div className="post-document">
//       <h2>Post Document</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group-doc">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             value={document.name}
//             onChange={(e) => setDocument({ ...document, name: e.target.value })}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <textarea
//             id="description"
//             value={document.description}
//             onChange={(e) => setDocument({ ...document, description: e.target.value })}
//             placeholder="Write your document description here"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="file">File:</label>
//           <input
//             type="file"
//             id="file"
//             onChange={handleFileChange}
//             accept=".pdf,.doc,.docx,.jpg,.png"
//             required
//           />
//         </div>
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// };

// export default PostDocument;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {postDocument } from '../../actions/adminActions';
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


const PostDocument = () => {
  const dispatch = useDispatch();
  const [document, setDocument] = useState({
    name: '',
    description: '',
    file: null
  });
  // Debounced handler for description change
  const handleDescriptionChange = debounce((value) => {
    setDocument({
      ...document,
      description: value
    });
  }); // Adjust debounce delay as needed (300ms in this example)

  const {error} = useSelector(state=>state.document)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare form data
    const formData = new FormData();
    formData.append('name', document.name);
    formData.append('description', document.description);
    formData.append('file', document.file);
    console.log("Document",formData)
    // Dispatch action to post announcement with form data
    dispatch(postDocument(formData));

    // Reset form fields
    setDocument({
      name: '',
      description: '',
      file: null
    });
  };

  const handleFileChange = (e) => {
    setDocument({
      ...document,
      file: e.target.files[0]
    });
  };

  return (
    <Container maxWidth="md">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <Typography variant="h4" align="center" gutterBottom>
        Post Document
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="name"
              label="Subject"
              variant="outlined"
              fullWidth
              value={document.name}
              onChange={(e) => setDocument({ ...document, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <textarea
              id="description"
              placeholder="Write your Document description here"
              minRows={4}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
              value={document.description}
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

export default PostDocument;
