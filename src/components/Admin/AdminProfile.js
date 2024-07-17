import React,{ useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAdminProfile } from '../../actions/profileActions';
import './AdminProfile.css';
import Message from '../Message'

const AdminProfile = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseType, setHouseType] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.admin);
  const user = useSelector(state => state.admin.profile);
  const navigate =useNavigate();
  // const error = auth.error?auth.error:user.error
  useEffect(() => {
    if (auth.isAuthenticated) {
      if(!user){
          dispatch(fetchAdminProfile());
      }
      else{
        setName(user.name);
        setEmail(user.email);
        setMobileNumber(user.mobileNumber);
        setHouseNumber(user.houseNumber);
        setHouseType(user.houseType);
      }
    }
    else{
      dispatch(fetchAdminProfile());
      //navigate('/admin-login');
    }
  }, [dispatch, user]);
  if (!user) return <p>Loading...</p>;

  return (
    <div className="admin-profile">
    {/* {error && <Message variant="danger">{error.message}</Message>} */}
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <h2>Admin Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Mobile Number: <span>{user.mobileNumber}</span></p>
    </div>
  );
};

export default AdminProfile;
