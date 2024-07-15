// src/components/Settings.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faHandHoldingDollar, faGlobe, faPalette, faList, faLifeRing, faInfoCircle, faTrashAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sitting.css'; // تأكد من وجود هذا المسار الصحيح لملف CSS

function Settings({ Logout }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleChangeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    toast.success(t('changeLanguageMessage'), {
      position: toast.POSITION.TOP_CENTER
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="font-weight-bold">{t('Settings')}</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/ChangePassword')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="mr-3" />
            {t('Change Password')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/YourSubscriptions')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="mr-3" />
            {t('Your Subscriptions')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={handleChangeLanguage}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faGlobe} className="mr-3" />
            {t('Change Language')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/ChangeTheme')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faPalette} className="mr-3" />
            {t('Change Theme')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/TermsConditions')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faList} className="mr-3" />
            {t('Terms & Conditions')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/Cobons')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faHandHoldingDollar} className="mr-3" />
            {t('Cobons')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/HelpCenter')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faLifeRing} className="mr-3" />
            {t('Help Center')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/What')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faLifeRing} className="mr-3" />
            {t('What we can post?')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/AboutUs')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-3" />
            {t('About Us')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleNavigate('/DeleteAccount')}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faTrashAlt} className="mr-3" />
            {t('Delete Account')}
          </div>
          <span>&gt;</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={Logout}>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
            {t('Logout')}
          </div>
          <span>&gt;</span>
        </li>
      </ul>
    </div>
  );
}

export default Settings;
