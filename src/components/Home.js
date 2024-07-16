import React from 'react';
import { useNavigate } from 'react-router-dom';
import RailViharLogo from '../images/logo.png';
import { fetchAnnouncementDetail } from '../actions/adminActions';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import baseURL from '../URL'

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [announcements, setAnnouncements] = React.useState([]);

  const handleAnnouncementClick = (id) => {
    dispatch(fetchAnnouncementDetail(id));
    navigate(`/announcements/${id}`);
  };

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/announcements`);
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);
  console.log(announcements);


  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <div className="logo-container">
          <img src={RailViharLogo} alt="Rail Vihar Logo" className="logo" />
          <p className="registration-number">Reg. No.: 491/2015</p>
          <p className="Tan-number">TAN No.: MRTR04497D</p>
        </div>
        <nav>
          <Button onClick={handleLogin} variant="text">Login</Button>
          <Button onClick={() => navigate('/admin-login')} variant="text">Admin Login</Button>
          <Button onClick={() => navigate('/register')} variant="text">Register</Button>
          <Button onClick={() => navigate('/forgot-password')} variant="text">Forgot Password</Button>
          <Button onClick={() => navigate('/documents')} variant="text">Documents</Button>
          <Button onClick={()=>navigate('/team')} variant='text'>Team</Button>
        </nav>
      </header>
      <main>
      <div className='carousel-container'>
        <Carousel controls={false} indicators={false} interval={2000} direction="prev">
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image1.png")} alt="First slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image2.png")} alt="Second slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image3.png")} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image4.png")} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image5.png")} alt="Third slide" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={require("../images/image6.png")} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        </div>
        <h1 className="main-heading">Rail Vihar</h1>
        <div className="image-container">
          <div>
            <img src={require("../images/president.png")} alt="President" />
            <p>President</p>
            <p>9760531820</p>
          </div>
          <div>
            <img src={require("../images/secretary.png")} alt="Secretary" />
            <p>Secretary</p>
            <p>9717638851</p>
          </div>
          <div>
            <img src={require("../images/treasurer.png")} alt="Treasurer" />
            <p>Treasurer</p>
            <p>8171693063</p>
          </div>
        </div>
        <div className="announcements-home">
          <div className="scrolling-window">
            {Array.isArray(announcements) && announcements.map((announcement) => (
              <div key={announcement._id} className="announcement-item-home" onClick={() => handleAnnouncementClick(announcement._id)}>
                <p className="announcement-details-home"><b>{announcement.name}:</b> {announcement.description.split(' ').slice(0, 10).join(' ')}..</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Rail Vihar Shatabdi Nagar RWA, Meerut</p>
        <p>Addr: Community Hall, Rail Vihar, Sector 5, Pocket B, Shatabdi Nagar, Meerut, U.P. - 250103</p>
        <p>Made by: <a href="https://www.linkedin.com/in/harsh-vishwakarma-019a32126/" target="_blank">Harsh Vishwakarma</a></p>

      </footer>
    </div>
  );
};

export default Home;
