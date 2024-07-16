import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/authActions';
import './Register.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';
import Message from '../Message'

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    houseNumber: '',
    houseType: '',
    mobileNumber: '',
    accessCode: ''
  });
  const navigate = useNavigate()
  const { name, email, password, houseNumber, houseType, mobileNumber, accessCode } = formData;
  const {error}  = useSelector(state=>state.auth)
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password, houseNumber, houseType, mobileNumber, accessCode }));
    navigate('/login')
  };

  return (
    <div className="register-container">
    {error && <Message variant="danger">{error.message}</Message>}
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>House Number</label>
          <input
            type="text"
            placeholder="Enter your house number"
            name="houseNumber"
            value={houseNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>House Type</label>
          <input
            type="text"
            placeholder="Enter your house type"
            name="houseType"
            value={houseType}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            placeholder="Enter your mobile number"
            name="mobileNumber"
            value={mobileNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Access Code</label>
          <input
            type="text"
            placeholder="Enter your access code"
            name="accessCode"
            value={accessCode}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
