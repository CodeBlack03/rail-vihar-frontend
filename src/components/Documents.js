import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments, fetchDocumentDetail } from '../actions/adminActions';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Card, CardContent, Typography } from '@mui/material';
import Message from './Message';
import './Documents.css';

const DocumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { documents, loading, error } = useSelector((state) => state.document);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleDocumentClick = (id) => {
    dispatch(fetchDocumentDetail(id));
    navigate(`/documents/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      {error && <Message variant="danger">{error.message}</Message>}
      <Header />
      <div className="documents-list">
        <Typography variant="h5" component="h2" gutterBottom>
          All Documents
        </Typography>
        {documents.map((document) => (
          <Card
            key={document._id}
            className="document-item"
            onClick={() => handleDocumentClick(document._id)}
            elevation={2}
          >
            <CardContent>
              <Typography variant="h6" component="h3">
                {document.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {document.description.split(' ').slice(0, 20).join(' ')}...
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsList;
