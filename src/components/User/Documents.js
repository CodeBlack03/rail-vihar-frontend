import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Documents.css';
import Message from '../Message'
import baseURL from '../../URL'

const Documents = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/documents`);
        setDocuments(response.data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="Documents">
      <h1>Documents</h1>
      {documents.length > 0 ? (
        documents.map((document) => (
          <div key={document._id}>
            <a href={document.url} download>{document.title}</a>
          </div>
        ))
      ) : (
        <p>No documents available</p>
      )}
    </div>
  );
};

export default Documents;
