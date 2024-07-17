import React, { useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { postExpenditure } from '../../actions/expenditureActions';
import './PostExpenditureForm.css';
import { useNavigate } from 'react-router-dom';
import Message from '../Message'

const PostExpenditureForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    date: '',
    file: null,
  });
  const {error} = useSelector(state=>state.expenditures)
  const navigate = useNavigate()
  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({
        ...formData,
        file: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { file, ...rest } = formData;
    const formDataToSend = new FormData();
    formDataToSend.append('file', file);
    Object.entries(rest).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    dispatch(postExpenditure(formDataToSend));
    setFormData({
      category: '',
      description: '',
      amount: '',
      date: '',
      file: null,
    });
    navigate('/admin/expenditures')
  };

  return (
    <div className="post-expenditure-form">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}
      <h2>Post Expenditure</h2>
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
        <div className="form-group">
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          />
        </div>
        <button type="submit">Post Expenditure</button>
      </form>
    </div>
  );
};

export default PostExpenditureForm;
