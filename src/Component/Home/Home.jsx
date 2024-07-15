import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import eid1 from '../../Assets/eid.avif';
import eid2 from '../../Assets/Eid-al-fitr.jpeg';
import eid3 from '../../Assets/photo.jpg';
import Face from '../../Assets/facebook-new-2023-icon9594.logowik.com.webp';
import './Home.css';
import { UserContext } from '../../context/user.context';

export default function Home() {
  const [postContent, setPostContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false); // Subscription status
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();
  const [users ,setUsers] =useState()

const {setUserData} =useContext(UserContext )
  const yesShire = () => {
    // alert("hi")
    if (showSubscriptionAlert) {
      navigate('/Sharescreen');
      console.log(showSubscriptionAlert);
    } 
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      if (file.type.startsWith('image/')) {
        setFileType('image');
      } else if (file.type.startsWith('video/')) {
        setFileType('video');
      } else {
        setFileType('');
      }
    }
  };

  useEffect(()=>{
    const savedUserEmailData = localStorage.getItem('userData');
    const user = JSON.parse(savedUserEmailData);
    // console.log(user);
    if(user.userProgramSubscriptions.length != 0 ){
      console.log(user);
      setShowSubscriptionAlert(true)
      setUsers(user.userProgramSubscriptions.length)
      // context
      
      setUserData(user)
    }

  },[])



  const handleSeeAllClick = () => {
    navigate('/What'); // Change '/SeeAll' to your target route
  };


  return (
    <>
      <div className="container mt-5">
        <div className="custom-card shadow-lg animate__animated animate__fadeIn">
          <div className="custom-card-body">
            <h5 className="custom-card-title text-center">Create a Post</h5>
            <div className="form-group mt-4">
              <label htmlFor="postContent" className="form-label">
                <i className="fa-solid fa-pen me-2" aria-hidden="true"></i>
                Type anything here
              </label>
              <textarea
                className="form-control"
                id="postContent"
                rows="4"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onClick={yesShire}
                placeholder="What's on your mind?"
              ></textarea>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <label htmlFor="imageInput">
                <i className="fa-solid fa-image me-2" aria-hidden="true" style={{ cursor: 'pointer' }}></i>
              </label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="videoInput">
                <i className="fa-solid fa-video me-2" aria-hidden="true" style={{ cursor: 'pointer' }}></i>
              </label>
              <input
                type="file"
                id="videoInput"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            {selectedFile && (
              <div className="mt-3">
                {fileType === 'image' && <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={{ maxWidth: '100%', borderRadius: '10px' }} />}
                {fileType === 'video' && <video controls style={{ maxWidth: '100%', borderRadius: '10px' }}><source src={URL.createObjectURL(selectedFile)} type={selectedFile.type} /></video>}
              </div>
            )}
            <button className="btn btn-yellow mt-3" >Post</button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fw-bold">Templates</h2>
          <a href="#" className="text-decoration-none text-warning fw-bold">See All</a>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="card animate__animated animate__zoomIn" style={{ borderRadius: '15px' }}>
              <img src={eid1} className="card-img-top" alt="Template Image 1" style={{ borderRadius: '15px 15px 0 0' }} />
              <div className="card-body">
                <h5 className="card-title">Eid Fatr S3eed</h5>
                <p className="card-text">Write an amazing description in this</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card animate__animated animate__zoomIn" style={{ borderRadius: '15px' }}>
              <img src={eid2} className="card-img-top" alt="Template Image 2" style={{ borderRadius: '15px 15px 0 0' }} />
              <div className="card-body">
                <h5 className="card-title">Eid Fatr S3eed</h5>
                <p className="card-text">Write an amazing description in this</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card animate__animated animate__zoomIn" style={{ borderRadius: '15px' }}>
              <img src={eid3} className="card-img-top" alt="Template Image 3" style={{ borderRadius: '15px 15px 0 0' }} />
              <div className="card-body">
                <h5 className="card-title">Eid Fatr S3eed</h5>
                <p className="card-text">Write an amazing description in this</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container mt-5">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h2 className="fw-bold">What you can post?</h2>
    <a href="#" className="text-warning" onClick={handleSeeAllClick}>See All</a>
  </div>
  <div className="card shadow-sm">
    <div className="card-body d-flex align-items-center">
      <img src={Face} alt="Facebook logo" className="rounded-circle me-3" />
      <div>
        <h5 className="card-title mb-1">FaceBook</h5>
        <p className="card-text text-muted mb-0">1- Post :-</p>
        <p className="card-text text-muted">- Image: - 3 Images.</p>
      </div>
    </div>
  </div>
</div>

      {/* Subscription Alert */}
      {users == 0 &&  (
        <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            You need to subscribe to a package to access this feature.
            <button type="button" className="btn-close" onClick={""} aria-label="Close"></button>
          </div>
        </div>
      )}
    </>
  );
}
