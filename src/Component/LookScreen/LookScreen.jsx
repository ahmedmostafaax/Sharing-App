import React from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../Assets/Logo 1.png';

export default function LookScreen() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup'); // الانتقال إلى صفحة التسجيل
  };

  const handleLogin = () => {
    navigate('/signin'); // الانتقال إلى صفحة تسجيل الدخول
  };

  return (
    <div className="container text-center mt-5">
      <img className="small-image mb-4" src={image} alt="logo" />
      <h1 className="font-bold">Welcome to <span className="text-yellow-500">POSTBET</span></h1>
      <p className="text-zinc-500">Let's Get Started</p>
      <div className="d-flex flex-column align-items-center">
        <button
          type="button"
          className="btn btn-warning text-white mb-3"
          onClick={handleSignUp}
        >
          I'm New To Postbet, Let's Sign Up
        </button>
        <button type="button" className="btn btn-outline-warning" onClick={handleLogin}>
          I Already Have An Account
        </button>
      </div>
    </div>
  );
}