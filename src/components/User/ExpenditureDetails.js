import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link,  useNavigate } from 'react-router-dom';
import { fetchExpenditureDetail, deleteExpenditure ,downloadExpenditureFile} from '../../actions/expenditureActions';
import './ExpenditureDetails.css';
import Message from '../Message'

const ExpenditureDetails = () => {
  const dispatch = useDispatch();
 
  const { id } = useParams();
  const { expenditure, loading, error } = useSelector(state => state.expenditures);
    const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchExpenditureDetail(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this expenditure?')) {
      dispatch(deleteExpenditure(id));
      navigate('/admin/expenditures');
    }
  };
  const handleDownload = () => {
    window.location.href = `/api/expenditures/${id}/download`;
  };
  const handleDownloadFile = () => {
    dispatch(downloadExpenditureFile(id));
  };
  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  if (!expenditure) return <p>Expenditure not found</p>;

  return (
    <div className="expenditure-details">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
     {error && <Message variant="danger">{error.message}</Message>}
      <h2>Expenditure Detail</h2>
      <p>Category: {expenditure.category}</p>
      <p>Description: {expenditure.description}</p>
      <p>Amount: {expenditure.amount}</p>
      <p>Date: {new Date(expenditure.date).toLocaleDateString()}</p>      
        {/* {expenditure.filePath && (
        <button onClick={handleDownloadFile}>
          Download File
        </button>

      )} */}
    </div>
  );
};

export default ExpenditureDetails;
