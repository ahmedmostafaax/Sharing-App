import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../../Assets/postbet (1).png';
import ProfileImage from '../../Assets/Logo 1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Sittings/Sitting.css';

export default function Navbar() {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClose = () => setShowProfile(false);
  const handleProfileShow = () => setShowProfile(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <img className="image" src={Logo} alt="" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/LinkAcount">
                  LinkAcount
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Subscription">
                  Subscription
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <div className="nav-link position-relative" onClick={handleProfileShow} style={{ cursor: 'pointer' }}>
                  <img src={ProfileImage} alt="Profile" className="profile-image" />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    9+
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Offcanvas show={showProfile} onHide={handleProfileClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Profile />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profileImage: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const userId = {userData}; // استبدل YOUR_USER_ID بمعرف المستخدم الحقيقي

  useEffect(() => {
    axios.get(`https://postbet.ae/User/${userId}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = userData.profileImage;

    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      try {
        const imageResponse = await axios.post('https://postbet.ae/uploadProfileImage', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        imageUrl = imageResponse.data.imageUrl;
        setUserData(prevState => ({
          ...prevState,
          profileImage: imageUrl,
        }));
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }

    try {
      await axios.put(`https://postbet.ae/User/${userId}`, {
        ...userData,
        profileImage: imageUrl,
      });
      alert('User data updated successfully');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <img src={userData.profileImage || "https://placehold.co/100x100"} alt="Profile" className="rounded-circle" />
            <div className="position-relative">
              <img
                src="https://placehold.co/20x20"
                className="position-absolute top-0 start-100 translate-middle"
                alt="Edit Icon"
              />
            </div>
          </div>
          <h5 className="card-title mt-3">
            {userData.name} <i className="fa-solid fa-camera-retro"></i>
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text">👤</span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="name name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">Profile Image</label>
              <input
                type="file"
                className="form-control"
                id="profileImage"
                name="profileImage"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-warning text-white">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}
