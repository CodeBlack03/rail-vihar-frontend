import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetail, updateUserProfile } from '../../actions/adminActions';
import { useNavigate, useParams } from 'react-router-dom';
import './EditUserProfile.css';
import Message from '../Message'


const EditUserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading,error } = useSelector(state => state.admin);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    houseType: '',
    houseNumber: '',
    dues:""
  });

  useEffect(() => {
    dispatch(fetchUserDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        houseType: user.houseType,
        houseNumber: user.houseNumber,
        dues: user.dues
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(id, formData));
    navigate(`/admin/users/${id}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="edit-user-profile">
    {error && <Message variant="danger">{error.message}</Message>}

      <h2>Edit User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseType">House Type</label>
          <input
            type="text"
            id="houseType"
            name="houseType"
            value={formData.houseType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House Number</label>
          <input
            type="text"
            id="houseNumber"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dues">Dues</label>
          <input
            type="text"
            id="dues"
            name="dues"
            value={formData.dues}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditUserProfile;
