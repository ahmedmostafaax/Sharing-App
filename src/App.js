import React, { useEffect, useState } from 'react';
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Component/Home/Home';
import Linkacount from './Component/Linkacount/Linkacount';
import Subscription from './Component/Subscription/Subscription';
import MainLayout from './Layouts/MainLayout';
import Profile from './Component/Profile/Profile';
import AuthLayout from './Layouts/AuthLayout';
import { Offline, Online } from 'react-detect-offline';
import Signup from './Component/Signup/Signup';
import Signin from './Component/Signin/Signin';
import NotFound from './Component/NotFound/NotFound';
import IsLayout from './Layouts/IsLayout';
import LookScreen from './Component/LookScreen/LookScreen';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import Sharescreen from './Component/Sharescreen/Sharescreen';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import MassegeSend from './Component/MassegeSend/MassegeSend';
import ResetPassword from './Component/ResetPassword/ResetPassword';
import Cobon from './Component/Cobon/Cobon';
import EnterCode from './Component/EnterCode/EnterCode';
import CheckOut from './Component/CheckOut/CheckOut';
import ChangeLanguage from './Component/ChangeLanguage/ChangeLanguage';
import ChangeTheme from './Component/ChangeTheme/ChangeTheme';
import ChangePassword from './Component/ChangePassword/ChangePassword';
import AboutUs from './Component/AboutUs/AboutUs';
import DeleteAccount from './Component/DeleteAccount/DeleteAccount';
import HelpCenter from './Component/HelpCenter/HelpCenter';
import TermsConditions from './Component/TermsConditions/TermsConditions';
import YourSubscriptions from './Component/YourSubscriptions/YourSubscriptions';
import VeryfyCode from './Component/veryfay/VeryfyCode.jsx';
import UserContextProvider from './context/user.context.js';
import { jwtDecode } from "jwt-decode";
import Settings from './Component/Sittings/Sittings';
import Cobons from './Component/Cobons/Cobons.jsx';
import SubscriptionPlans from './Component/SubscriptionPlans/SubscriptionPlans.jsx';
import What from './Component/What/What.jsx';

function App() {
  let [userData, setUserData] = useState(null);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");

      let userData = jwtDecode(token);
      
      saveUserData(userData);
    }
  }, []);



  function Logout() {
    saveUserData(null);
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }




  function saveUserData(data) {
    setUserData(data);
  }

  
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <IsLayout  Logout={Logout} userData={userData} />,
      children: [
        { path: 'LookScreen', element: <LookScreen /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout Logout={Logout}/>,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'Linkacount', element: <ProtectedRoutes><Linkacount userData={userData}/></ProtectedRoutes> },
        { path: 'Subscription', element: <ProtectedRoutes><SubscriptionPlans /></ProtectedRoutes> },
        { path: 'Profile', element: <ProtectedRoutes><Profile /></ProtectedRoutes> },
        { path: 'Sittings', element: <ProtectedRoutes><Settings Logout={Logout} /></ProtectedRoutes> },
        { path: 'Sharescreen', element: <ProtectedRoutes><Sharescreen /></ProtectedRoutes> },
        { path: 'Cobon/:id', element: <ProtectedRoutes><Cobon/></ProtectedRoutes> },
        { path: 'EnterCode/:id', element: <ProtectedRoutes><EnterCode /></ProtectedRoutes> },
        { path: 'CheckOut', element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
        { path: 'ChangeLanguage', element: <ProtectedRoutes><ChangeLanguage /></ProtectedRoutes> },
        { path: 'ChangeTheme', element: <ProtectedRoutes><ChangeTheme /></ProtectedRoutes> },
        { path: 'ChangePassword', element: <ProtectedRoutes><ChangePassword /></ProtectedRoutes> },
        { path: 'AboutUs', element: <ProtectedRoutes><AboutUs /></ProtectedRoutes> },
        { path: 'DeleteAccount', element: <ProtectedRoutes><DeleteAccount /></ProtectedRoutes> },
        { path: 'HelpCenter', element: <ProtectedRoutes><HelpCenter /></ProtectedRoutes> },
        { path: 'TermsConditions', element: <ProtectedRoutes><TermsConditions /></ProtectedRoutes> },
        { path: 'YourSubscriptions', element: <ProtectedRoutes><YourSubscriptions /></ProtectedRoutes> },
        { path: 'Cobons', element: <ProtectedRoutes><Cobons /></ProtectedRoutes> },
        { path: 'SubscriptionPlans', element: <ProtectedRoutes><SubscriptionPlans /></ProtectedRoutes> },
        { path: 'What', element: <ProtectedRoutes><What /></ProtectedRoutes> },



  

        { path: '*', element: <NotFound /> },
      ],
    },
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: 'Signup', element: <Signup /> },
        { path: 'Signin', element: <Signin saveUserData={saveUserData} /> },
        { path: 'VeryfyCode', element: <VeryfyCode saveUserData={saveUserData}/> },
        { path: 'ForgetPassword', element: <ForgetPassword /> },
        { path: 'MassegeSend', element: <MassegeSend /> },
        { path: 'ResetPassword', element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <Online>
        <UserContextProvider>
        <RouterProvider router={routes} />
        </UserContextProvider>
      </Online>
      <Offline>
        <div className='offline'>
          You Are Offline Now!
        </div>
      </Offline>
    </>
  );
}

export default App;
