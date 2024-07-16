import React from 'react';
import { useNavigate } from 'react-router-dom';
import RailViharLogo from '../images/logo.png';
import './Header.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClickImg = () => {
    navigate('/');
  }

  return (
    <header className="Home-header">
      <div className="logo-container">
        <img src={RailViharLogo} alt="Rail Vihar Logo" className="logo" onClick={handleClickImg} />
        {/* Uncomment the following line if needed */}
        {/* <p className="registration-number">Registration Number: 123ABC</p> */}
      </div>
    </header>
  );
};

export default Home;
