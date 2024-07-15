import React, { useState, useEffect } from 'react';
import axios from 'axios';
import shareimage1 from '../../Assets/modern-badge-logo-instagram-icon_578229-124.avif';
import shareimage2 from '../../Assets/facebook-new-2023-icon9594.logowik.com.webp';
import shareimage3 from '../../Assets/Tiktok_Logo.png';
import shareimage4 from '../../Assets/circle-linkedin-512.webp';
import shareimage5 from '../../Assets/Telegram_logo.svg.webp';
import shareimage6 from '../../Assets/images x.jpeg';
import shareimage7 from '../../Assets/images.pinterest.png';
import shareimage8 from '../../Assets/images.reddit.jpeg';
import shareimage9 from '../../Assets/google_my_business_512dp.png';
import shareimage10 from '../../Assets/Youtube.jpg';
import '../Sharescreen/Sharescreen.css';
import { useFormik } from 'formik';

export default function Sharescreen() {
  const [userData, setUserData] = useState('');
  const [id, setId] = useState('');
  const [url, setUrl] = useState();



  useEffect(() => {
    const savedUserEmailData = localStorage.getItem('userData');
    const user = JSON.parse(savedUserEmailData);
    console.log(user.userProgramSubscriptions.slice(-1)[0].id)
    setId(user.userProgramSubscriptions.slice(-1)[0].id)
    setUserData(user.userProgramSubscriptions.slice(-1)[0]);



  }, []);


  
  const postForm = useFormik({
    initialValues: {
      post: '',
      platform: '',
      facebookOptions: {
        stories: false,
        reels: false,
        image: false,
      },
      instagramOptions: {
        stories: false,
        reels: false,
        image: false,
      },
      mediaUrls: '',
      
    },
    onSubmit:userdata
  });

  let token = localStorage.getItem("token");


  async function userdata (values)  {

    const postData = {
      post: values.post,
      platform: values.platform.map((platform) => ({
        platform,
        isSelected: true,
      })),
      facebookOptions: values.platform.includes('Facebook')
        ? values.facebookOptions 
        : undefined,
        mediaUrls:url
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    console.log(postData,headers);

    const {data} = await axios.post(`https://postbet.ae/Posting/post/${id}`,postData,{
      headers
    }).catch((err)=>{
      console.log(err);
    })
    
    console.log(data);
  }



  const handlePlatformChange = (platform, option = null) => {
    const isChecked = postForm.values.platform.includes(platform);
    if (isChecked) {
      postForm.setFieldValue(
        'platform',
        postForm.values.platform.filter((p) => p !== platform)
      );
      if (platform === 'Facebook' || platform === 'Instagram') {
        postForm.setFieldValue('facebookOptions.stories', false);
        postForm.setFieldValue('facebookOptions.reels', false);
        postForm.setFieldValue('facebookOptions.image', false);
        postForm.setFieldValue('instagramOptions.stories', false);
        postForm.setFieldValue('instagramOptions.reels', false);
        postForm.setFieldValue('instagramOptions.image', false);
      }
    } else {
      postForm.setFieldValue('platform', [
        ...postForm.values.platform,
        platform,
      ]);
      if (platform === 'Facebook' || platform === 'Instagram') {
        postForm.setFieldValue('facebookOptions.stories', true);
        postForm.setFieldValue('instagramOptions.stories', true);

        if (option === 'reels') {
          postForm.setFieldValue('facebookOptions.reels', true);
          postForm.setFieldValue('instagramOptions.reels', true);

        } else {
          postForm.setFieldValue('facebookOptions.reels', false);
          postForm.setFieldValue('instagramOptions.reels', false);

        }
        if (option === 'image') {
          postForm.setFieldValue('facebookOptions.image', true);
          postForm.setFieldValue('facebookOptions.reels', true);
          postForm.setFieldValue('instagramOptions.image', true);
          postForm.setFieldValue('instagramOptions.reels', true);
        } else {
          postForm.setFieldValue('facebookOptions.image', false);
          postForm.setFieldValue('instagramOptions.image', false);

        }
      }
    }
  };




  const uploadImage = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      console.log(values.file);
  
      const formData = new FormData();
      formData.append('file', values.file);
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer TH8S6RT-67ZMT2F-HTB3ZSH-PFEAPER`,
      };
  
      console.log(formData, headers);
  
   
        const { data } = await axios.post(
          'https://app.ayrshare.com/api/media/upload',
          formData,
          { headers }
        ).catch((err)=>{
          console.log(err);
        })
     
      if(data){
        if(data.url != undefined){
          setUrl(data.url)
        }
      }
    }
  });






  return (
    <>
    
      <div className="container mt-5">


      


        <form onSubmit={postForm.handleSubmit}>
          <div className="custom-card shadow-lg animate__animated animate__fadeIn">
            <div className="custom-card-body">
              <h5 className="custom-card-title text-center">Create a Post</h5>
              <div className="form-group mt-4">
                <label htmlFor="poto" className="form-label">
                  <i
                    className="fa-solid fa-pen me-2"
                    aria-hidden="true"
                  ></i>
                  
                </label>
                <textarea
                  className="form-control"
                  id="post"
                  name='post'
                  rows="4"
                  onBlur={postForm.handleBlur}
                  value={postForm.values.email}
                  onChange={postForm.handleChange}
                  placeholder="What's on your mind?"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button disabled={!(postForm.dirty && postForm.isValid)} type="submit" className="btn btn-warning custom-btn">Share</button>
          </div>


          <form onSubmit={uploadImage.handleSubmit}>
<div className="d-flex align-items-center justify-content-between mt-3">
<button className='btn btn-warning custom-btn' type='submit'>Confirm the photo</button>
                  <label htmlFor="file"><i className="fa-solid fa-image me-2 fs-2" aria-hidden="true" style={{ cursor: 'pointer' }} ></i></label>
                  <input
                  onChange={(event) => {
                    uploadImage.setFieldValue('file', event.currentTarget.files[0]);
                  }}
                  type="file"
                  className="photo"
                  id="file"
                  name="file"
                />
              </div>
</form>



          {userData.paymentStatus === "Paid" && userData.plan.Facebook && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="stories"
                      name='facebook'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Facebook', 'stories')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Facebook</strong><br />
                      <small>Stories</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage2} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="reels"
                      name='facebook'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Facebook', 'reels')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="reels">
                      <strong>Facebook</strong><br />
                      <small>Stories & Reels</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage2} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="image"
                      name='facebook'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Facebook', 'image')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="image">
                      <strong>Facebook</strong><br />
                      <small>Stories & Reels & Image</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage2} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>
            </>
          )}


{userData.paymentStatus === "Paid" && userData.plan.Instagram && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="stories"
                      name='Instagram'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Instagram', 'stories')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Instagram</strong><br />
                      <small>Stories</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage1} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="reels"
                      name='Instagram'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Instagram', 'reels')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="reels">
                      <strong>Instagram</strong><br />
                      <small>Stories & Reels</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage1} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="image"
                      name='Instagram'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Instagram', 'image')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="image">
                      <strong>Instagram</strong><br />
                      <small>Stories & Reels & Image</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage1} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>
            </>
          )}


{userData.paymentStatus === "Paid" && userData.plan.YouTube && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="YouTube"
                      name='YouTube'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('YouTube')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>YouTube</strong><br />
                      <small>YouTube</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage10} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )}  



{userData.paymentStatus === "Paid" && userData.plan.GoogleBusiness && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="GoogleBusiness"
                      name='GoogleBusiness'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('GoogleBusiness')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>GoogleBusiness</strong><br />
                      <small>GoogleBusiness</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage9} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 


          {userData.paymentStatus === "Paid" && userData.plan.LinkedIn && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="LinkedIn"
                      name='LinkedIn'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('LinkedIn')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>LinkedIn</strong><br />
                      <small>LinkedIn</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage4} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 


  {userData.paymentStatus === "Paid" && userData.plan.Pinterest && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Pinterest"
                      name='Pinterest'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Pinterest')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Pinterest</strong><br />
                      <small>Pinterest</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage7} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 

  {userData.paymentStatus === "Paid" && userData.plan.Reddit && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Reddit"
                      name='Reddit'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Reddit')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Reddit</strong><br />
                      <small>Reddit</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage8} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 


  {userData.paymentStatus === "Paid" && userData.plan.Telegram && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Telegram"
                      name='Telegram'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Telegram')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Telegram</strong><br />
                      <small>Telegram</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage5} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 


  {userData.paymentStatus === "Paid" && userData.plan.TikTok && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="TikTok"
                      name='TikTok'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('TikTok')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>TikTok</strong><br />
                      <small>TikTok</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage3} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>


          )} 


  {userData.paymentStatus === "Paid" && userData.plan.Twitter && (
            <>
              <div className='container mt-4'>
                <div className="row align-items-center mb-3">
                  <div className="col-auto">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="Twitter"
                      name='Twitter'
                      onBlur={postForm.handleBlur}
                      value={postForm.values.email}
                      onChange={() => handlePlatformChange('Twitter')}
                    />
                  </div>
                  <div className="col">
                    <label className="form-check-label" htmlFor="stories">
                      <strong>Twitter</strong><br />
                      <small>Twitter</small>
                    </label>
                  </div>
                  <div className="col-auto">
                    <img src={shareimage6} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
                  </div>
                </div>
              </div>

              
            </>
          )} 

        </form>
      </div>
    </>
  );
}
