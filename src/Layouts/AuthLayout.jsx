import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Logo from '../Assets/postbet (1).png';

export default function AuthLayout() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <img className='image' src={Logo} alt="PostBet Logo" />
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className='nav-item'>
                <NavLink className='nav-link' to='/signup'>
                  Signup
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/signin'>
                  Signin
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}