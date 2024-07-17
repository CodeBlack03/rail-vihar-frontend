// Profile.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../actions/profileActions';
import './Profile.css'; // Import the CSS file
import Message from '../Message'


const Profile = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseType, setHouseType] = useState("");
  const [dues, setDues] = useState("");
  const userDetails = useSelector((state) => state.profile);
  const { isAuthenticated,user,prof,error } = userDetails;
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const profile = useSelector(state => state.auth.user);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (auth.isAuthenticated) {
      if(!user){
          dispatch(fetchProfile());
      }
      else{
        setName(user.name);
        setEmail(user.email);
        setMobileNumber(user.mobileNumber);
        setHouseNumber(user.houseNumber);
        setHouseType(user.houseType);
        setDues(user.dues);
      }
    }
    else{
      navigate('/login');
    }
  }, [dispatch, user]);
  console.log(userDetails)
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <h2>Profile Details</h2>
      <p>Name: <span>{user.name}</span></p>
      <p>Email: <span>{user.email}</span></p>
      <p>Mobile Number: <span>{user.mobileNumber}</span></p>
      <p>House Type: <span>{user.houseType}</span></p>
      <p>House Number: <span>{user.houseNumber}</span></p>
      <p>Dues: <span>{user.dues}</span></p>
    </div>
  );
};

export default Profile;
