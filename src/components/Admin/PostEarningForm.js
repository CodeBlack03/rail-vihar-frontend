import React, { useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { postEarning } from '../../actions/earningActions';
import './PostEarningForm.css';
import { useSearchParams } from 'react-router-dom';
import Message from '../Message'


const PostEarningForm = () => {
  const dispatch = useDispatch();
  const [earning, setEarning] = useState({
    name: '',
    category: '',
    description: '',
    amount: '',
    date: '',
    file: null
  });
  const {error} = useSelector(state=>state.earnings)
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

    // Dispatch action to post earning with form data
    dispatch(postEarning(formData));
    
    // Reset form fields
    setEarning({
      name: '',
      category: '',
      description: '',
      amount: '',
      date: '',
      file: null
    });
  };

  const handleFileChange = (e) => {
    setEarning({
      ...earning,
      file: e.target.files[0]
    });
  };

  return (
    <div className="post-earning-form">
    {error && <Message variant="danger">{error.message}</Message>}

      <h2>Post New Earning</h2>
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
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          />
        </div>
        <button type="submit">Post Earning</button>
      </form>
    </div>
  );
};

export default PostEarningForm;
