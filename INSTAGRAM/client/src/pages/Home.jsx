import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Leftnav from '../components/Leftnav';
import Story from '../components/Story';
import Suggestions from '../components/Suggestions';
import Feedcard from '../components/Feedcard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : {};

  useEffect(() => {
    document.title = "Instagram | Feeds";

    if (!token) {
      navigate('/');
    }
  }, [navigate, token]);

  if (!token) {
    return null; 
  }

  return (
    <section className="full-feed-page">
      <Leftnav />
      <div className="right-feed-section">
        <div className="rfs-content-area">
          <div className="feed-section">
            <div className="rfsca-stories">
              <Story use = 'main'/>
              <Story />
            </div>
            <div className="rfsca-feed-cards">
              <Feedcard/>
            </div>
          </div>
          <div className="rfs-profile-section">
            <Link to="/profile">
              <div className="profile-wind">
                <div className="rfsps-left">
                  <div className="rfsps-left-img-ctrl">
                    <img
                      src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1719014400&semt=sph"
                      alt="Profile"
                    />
                  </div>
                  <div className="rfsps-left-name">
                    <p>{user.username || "Not LoggedIn"}</p>
                    <p className="user-name">{user.name || "Name Not Set"}</p>
                  </div>
                </div>
                <div className="rfsps-right">
                  <Link to="/" className="col-blue">Switch</Link>
                </div>
              </div>
            </Link>
            <div className="rfs-profile-section-heading">
              <p className="rfs-heading">Suggested for you</p>
              <Link to="/"><p>See All</p></Link>
            </div>
            <div className="rfs-profile-section-suggestions">
              <Suggestions  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
