import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../../actions/paymentActions';
import './MakePayment.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Message from '../Message'


const MakePayment = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: 'maintenance', // Default category value
    otherCategoryType: '',
    description: '',
    amount: '',
    file: null,
  });
  const navigate = useNavigate();
  const {error} = useSelector(state => state.payments)
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
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

    console.log("Make Payment", formDataToSend);
    dispatch(makePayment(formDataToSend));
    setFormData({
      category: 'maintenance', // Reset to default category value
      otherCategoryType: '',
      description: '',
      amount: '',
      file: null,
    });
    navigate('/dashboard/payments');
  };

  return (
    <div className="post-expenditure-form">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
     {error && <Message variant="danger">{error.message}</Message>}
      <h2>Make Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category" // Added name attribute
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="maintenance">Maintenance</option>
            <option value="NOC fund">NOC fund</option>
            <option value="other">Other</option>
          </select>
        </div>
        {formData.category === 'other' && (
          <div className="form-group">
            <label htmlFor="otherCategoryType">Other Category Type</label>
            <input
              type="text"
              id="otherCategoryType"
              name="otherCategoryType" // Added name attribute
              value={formData.otherCategoryType}
              onChange={handleChange}
              required
            />
          </div>
        )}
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
          <label htmlFor="file">File:</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            accept=".pdf,.doc,.docx,.jpg,.png,.jpeg"
          />
        </div>
        <button type="submit">Make Payment</button>
      </form>
    </div>
  );
};

export default MakePayment;