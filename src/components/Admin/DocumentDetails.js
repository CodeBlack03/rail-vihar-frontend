import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocumentDetail, deleteDocument, downloadDocumentFile } from '../../actions/adminActions';
import { useParams, useNavigate } from 'react-router-dom';
import './DocumentDetails.css';
import Message from '../Message'


const DocumentDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { documentDetail, loading,error } = useSelector(state => state.document);

    useEffect(() => {
        dispatch(fetchDocumentDetail(id));
    }, [dispatch, id]);

    const handleDelete = () => {
        dispatch(deleteDocument(id));
        navigate('/admin/documents'); // Redirect to documents list after deletion
    };

    const handleDownloadFile = () => {
        dispatch(downloadDocumentFile(id,documentDetail));
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="document-details">
        {error && <Message variant="danger">{error.message}</Message>}

            {documentDetail && (
                <>
                    <h2>{documentDetail.name}</h2>
                    <p>{documentDetail.description}</p>
                    <div className="button-container">
                        <button onClick={handleDownloadFile} className="download-button">Download File</button>
                        <button onClick={handleDelete} className="delete-button">Delete Document</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DocumentDetails;
