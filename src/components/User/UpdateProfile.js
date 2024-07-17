// UpdateProfile.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, fetchProfile } from '../../actions/profileActions';
import './UpdateProfile.css';
import { useNavigate } from 'react-router-dom';
import Message from '../Message';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [houseType, setHouseType] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    if (auth) {
      dispatch(fetchProfile());
    }
    else{
      navigate('/login')
    }
  }, [dispatch, auth.user]);

  const profile = useSelector(state => state.profile.user);
  console.log(auth)
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setMobileNumber(profile.mobileNumber);
      setHouseType(profile.houseType);
      setHouseNumber(profile.houseNumber);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      email,
      mobileNumber,
      houseType,
      houseNumber,
    };
    dispatch(updateProfile(updatedProfile));
    alert('Profile updated successfully!');
    navigate('/dashboard/profile')
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="update-profile">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {auth.error && <Message variant="danger">{auth.error.message}</Message>}

      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseType">House Type</label>
          <input
            type="text"
            id="houseType"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="houseNumber">House Number</label>
          <input
            type="text"
            id="houseNumber"
            value={houseNumber}
            onChange={(e) => setHouseNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
