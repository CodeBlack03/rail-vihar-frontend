import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,  useNavigate } from 'react-router-dom';
import { fetchExpenditureDetail, updateExpenditure } from '../../actions/expenditureActions';
import './EditExpenditureForm.css';
import Message from '../Message'


const EditExpenditureForm = () => {
  const dispatch = useDispatch();
  
  const { id } = useParams();
  const { expenditure, loading, error } = useSelector(state => state.expenditures);
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    date: '',
  });
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(fetchExpenditureDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (expenditure) {
      setFormData({
        category: expenditure.category,
        description: expenditure.description,
        amount: expenditure.amount,
        date: new Date(expenditure.date).toISOString().split('T')[0], // Format date for input type date
      });
    }
  }, [expenditure]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExpenditure(id, formData));
    navigate(`/admin/expenditures/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

  return (
    <div className="edit-expenditure-form">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <h2>Edit Expenditure</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Expenditure</button>
      </form>
    </div>
  );
};

export default EditExpenditureForm;
