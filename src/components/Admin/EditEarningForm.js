import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEarningDetail, updateEarning } from '../../actions/earningActions';
import './EditEarningForm.css';
import Message from '../Message'


const EditEarningForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { earningDetail, loading, error } = useSelector(state => state.earnings);
  const [earning, setEarning] = useState({
    name: '',
    category: '',
    description: '',
    amount: '',
    date: '',
    file: null
  });

  useEffect(() => {
    if (!earningDetail || earningDetail._id !== id) {
      dispatch(fetchEarningDetail(id));
    } else {
      setEarning({
        name: earningDetail.name,
        category: earningDetail.category,
        description: earningDetail.description,
        amount: earningDetail.amount,
        date: new Date(earningDetail.date).toISOString().slice(0, 10),
        file: null
      });
    }
  }, [dispatch, id, earningDetail]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('name', earning.name);
    formData.append('category', earning.category);
    formData.append('description', earning.description);
    formData.append('amount', earning.amount);
    formData.append('date', earning.date);
    formData.append('file', earning.file);

    // Dispatch action to update earning with form data
    dispatch(updateEarning(id, formData));
  };

  const handleFileChange = (e) => {
    setEarning({
      ...earning,
      file: e.target.files[0]
    });
  };

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;
  if (!earningDetail) return <p>Earning not found</p>;

  return (
    <div className="edit-earning-form">
    {error && <Message variant="danger">{error.message}</Message>}

      <h2>Edit Earning</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={earning.name}
            onChange={(e) => setEarning({ ...earning, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={earning.category}
            onChange={(e) => setEarning({ ...earning, category: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={earning.description}
            onChange={(e) => setEarning({ ...earning, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={earning.amount}
            onChange={(e) => setEarning({ ...earning, amount: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={earning.date}
            onChange={(e) => setEarning({ ...earning, date: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </div>
        <button type="submit">Update Earning</button>
      </form>
    </div>
  );
};

export default EditEarningForm;
