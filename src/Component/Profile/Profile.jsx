import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Sittings/Sitting.css'; // تأكد من وجود هذا المسار الصحيح لملف CSS

function App() {
  // const [showProfile, setShowProfile] = useState(false);

  // const handleProfileClose = () => setShowProfile(false);
  // const handleProfileShow = () => setShowProfile(true);

  return (
    <>
      {/* <div className="profile-icon" onClick={handleProfileShow}>
        <FontAwesomeIcon icon={faUser} size="lg" />
      </div>

      <Offcanvas show={showProfile} onHide={handleProfileClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Profile />
        </Offcanvas.Body>
      </Offcanvas> */}
    </>
  );
}

function Profile() {
  return (
    <div className="container mt-4">
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex justify-content-center">
            <img src="https://placehold.co/100x100" alt="Profile" className="rounded-circle" />
            <div className="position-relative">
              <img
                src="https://placehold.co/20x20"
                className="position-absolute top-0 start-100 translate-middle"
                alt="Edit Icon"
              />
            </div>
          </div>
          <h5 className="card-title mt-3">
            John Smith <i className="fa-solid fa-camera-retro"></i>
          </h5>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input type="email" className="form-control" id="email" placeholder="example@example.com" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <div className="input-group">
                <span className="input-group-text">👤</span>
                <input type="text" className="form-control" id="name" placeholder="name name" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning text-white">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;