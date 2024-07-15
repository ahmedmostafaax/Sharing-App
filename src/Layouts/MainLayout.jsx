import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar/Navbar'
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Component/Sittings/Sitting.css';

export default function MainLayout({Logout}) {
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { t, i18n } = useTranslation();

  const handleSettingsClose = () => setShowSettings(false);
  const handleSettingsShow = () => setShowSettings(true);
  const handleProfileClose = () => setShowProfile(false);

  const handleChangeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    toast.success(t('languageChanged'), {
      position: 'top-center',
    });
  };

  return (
    <>
      <Navbar />
      <Outlet />
      <div className="icons-container">
        <div className="settings-icon" onClick={handleSettingsShow}>
          <FontAwesomeIcon icon={faCog} size="lg" />
        </div>
      </div>

      <Offcanvas show={showSettings} onHide={handleSettingsClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t('settings')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Settings Logout={Logout} onClose={handleSettingsClose} onChangeLanguage={handleChangeLanguage} />
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showProfile} onHide={handleProfileClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t('profile')}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Profile />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function Settings({ Logout,onClose, onChangeLanguage }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="container mt-4">
      <h2 className="font-weight-bold">{t('settings')}</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/ChangePassword')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-hand-holding-dollar mr-3"></i>
            {t('changePassword')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/YourSubscriptions')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-hand-holding-dollar mr-3"></i>
            {t('yourSubscriptions')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={onChangeLanguage}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-globe mr-3"></i>
            {t('changeLanguage')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/ChangeTheme')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-palette mr-3"></i>
            {t('changeTheme')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/TermsConditions')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-list mr-3"></i>
            {t('termsConditions')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/Cobons')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-ticket-simple mr-3"></i>
            {t('cobons')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/HelpCenter')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-question mr-3"></i>
            {t('helpCenter')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/What')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-signs-post mr-3"></i>
            {t('whatWeCanPost')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/AboutUs')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-exclamation mr-3"></i>
            {t('aboutUs')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/DeleteAccount')}>
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-trash mr-3"></i>
            {t('deleteAccount')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center"  onClick={()=>{
          Logout()
          navigate("/signin")
        }} >
          <div className="d-flex align-items-center">
            <i className="fa-solid fa-right-from-bracket mr-3"></i>
            {t('logout')}
          </div>
          <span>&gt;</span>
        </li>
      </ul>
    </div>
  );
}

function Profile() {
  const { t } = useTranslation();
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
          { <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">{t('email')}</label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input type="email" className="form-control" id="email" placeholder="example@example.com" />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">{t('name')}</label>
              <div className="input-group">
                <span className="input-group-text">👤</span>
                <input type="text" className="form-control" id="name" placeholder="name name" />
              </div>
            </div>
            <button type="submit" className="btn btn-warning text-white">{t('update')}</button>
          </form> }
        </div>
      </div>
    </div>
  );
}
