import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { login } from '../../actions/authActions'; // Implement this action
import './Login.css';
import Message from '../Message'
import Teamimage from '../../images/Team.png'
import Header from '../Header'
const Team = () => {
    return(
        <div className="team-container">
        <Header/>
          <img src={Teamimage} alt="Team image" className="team" />
        </div>
    )

}

export default Team;