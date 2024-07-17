import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RailViharLogo from '../../images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../actions/profileActions';
import './UserHeader.css';
import Message from '../Message'


const UserHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const userDetails = useSelector((state) => state.profile);
  const { isAuthenticated, user,error } = userDetails;

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (!user) {
        dispatch(fetchProfile());
      }
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, user, auth.isAuthenticated]);

  const handleClickImg = () => {
    navigate('/');
  }

  return (
    <header className="UserHeader-header">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
    {error && <Message variant="danger">{error.message}</Message>}

      <div className="logo-container">
        <img src={RailViharLogo} alt="Rail Vihar Logo" className="logo" onClick={handleClickImg} />
      </div>
      <div className="Welcome">
        {isAuthenticated && user && <h2>Welcome {user.name} !</h2>}
      </div>
    </header>
  );
};

export default UserHeader;
