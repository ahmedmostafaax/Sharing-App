import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { UserContext } from '../../context/user.context.js';

export default function VerifyCode(saveUserData) {

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const navigate = useNavigate();
    const baseUrl = "https://postbet.ae";
  


 const {userEmail} = useContext(UserContext)

useEffect(()=>{
    if(userEmail == undefined){
        navigate('/signin')
    }
    
},[])

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email").min(7, "Minimum length is 7"),
    otp: Yup.string().required("OTP is required").min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
  });


  const formik = useFormik({
    initialValues: {
      email: `${userEmail}`,
      otp: "",
    },
    validationSchema,
    onSubmit: (values) => onSubmit(values),
  });




  const onSubmit = async (values) => {
    const {data} = await axios.post(`${baseUrl}/Auth/verifyAccount`,values).catch((err)=>{
        console.log(err);
    })
    if (data.success === true){

       localStorage.setItem('token', data.data.token);
      navigate(`/signin`);
      saveUserData(data.data.token)
      }
};



  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center">Verify Email</h2>
        {message && <div className="alert alert-danger">{message}</div>}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-at"></i>
              </span>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                className="form-control"
                name="email"
                id="email"
                placeholder="email"
                readOnly 
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">Code</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.otp}
                type="text"
                className="form-control"
                name="otp"
                id="otp"
                placeholder="code"
              />
              {formik.touched.otp && formik.errors.otp ? (
                <p className="text-danger">{formik.errors.otp}</p>
              ) : null}
            </div>
            <div className="d-grid gap-2 my-5">
            {loading ? <button type='button' className='btn btn-danger m-auto d-block w-100 my-3'><i className="fa-solid fa-spinner fa-spin"></i></button> : <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-warning text-white">send</button>}
          </div>
          </div>
        </form>
        {loading && <div className="text-center"><i className="fa fa-spinner fa-spin"></i> Loading...</div>}
      </div>
    </div>
  );
}
