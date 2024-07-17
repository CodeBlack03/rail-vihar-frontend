import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentDetail } from '../actions/adminActions';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { Button, Typography } from '@mui/material';
import { downloadDocumentFile } from '../actions/adminActions';
import './DocumentDetails.css';
import Message from './Message';

const DocumentDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { documentDetail, loading, error } = useSelector(state => state.document);

  useEffect(() => {
    dispatch(fetchDocumentDetail(id));
  }, [dispatch, id]);

  const handleDownload = () => {
    dispatch(downloadDocumentFile(id, documentDetail));
    //window.location.href = `http://localhost:5001/api/documents/${id}/download`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      {error && <Message variant="danger">{error.message}</Message>}
      <Header />
      <div className="document-details">
        {documentDetail && (
          <>
            <Typography variant="h4" component="h2" gutterBottom>
              {documentDetail.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {documentDetail.description}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleDownload}>
              Download File
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentDetails;
