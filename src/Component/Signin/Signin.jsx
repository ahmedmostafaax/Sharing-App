import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../context/user.context.js';

export default function Signin(saveUserData) {

  const {setUserEmailData} = useContext(UserContext)
  const { updateUserEmailData } = useContext(UserContext);

  let navigate = useNavigate();
  let basUrl = "https://postbet.ae";
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);


  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email').min(3, 'Minimum length is 3 characters'),
    password: Yup.string().required('Password is required').matches(/^[a-z][a-zA-Z0-9]{5,20}$/, 'Enter a valid password'),
  });
   

  const Login = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });



  async function onSubmit(values) {
    
    const {data} = await axios.post(`${basUrl}/Auth/login`,values).catch((err)=>{
      setErrorMsg(err.response.data.message);
    })
    console.log(data);
    if (data.success === true){
      console.log(data.data);
      // setUserEmailData({email:data.data.email,profileKey:data.data.profileKey})
      localStorage.setItem('userData', JSON.stringify(data.data));

      localStorage.setItem('userEmailData', JSON.stringify({ email: data.data.email, profileKey: data.data.profileKey }));
      localStorage.setItem('token', data.data.token);
      navigate(`/home`);

      saveUserData(data.data.token)
    }
    console.log(data.data.token);
  }

 


  return (
    <div className="container mt-5">
      <div className="card p-4 dark:bg-zinc-800">
        <h2 className="text-center text-warning dark:text-yellow-300">Login</h2>
        <p className="text-center text-muted dark:text-zinc-300">
          Create an account to start using PostBet
        </p>
        <form onSubmit={Login.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-at"></i>
              </span>
              <input
                onBlur={Login.handleBlur}
                value={Login.values.email}
                onChange={Login.handleChange}
                type="email"
                className="form-control"
                id="email"
                placeholder="example@example.com"
                name="email"
              />
              {Login.errors.email && Login.touched.email ? <div className="alert alert-danger">{Login.errors.email}</div> : ""}
            </div>
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                onBlur={Login.handleBlur}
                value={Login.values.password}
                onChange={Login.handleChange}
                type="password"
                className="form-control"
                id="password"
                placeholder="************"
                name="password"
              />
              {Login.errors.password && Login.touched.password ? <div className="alert alert-danger">{Login.errors.password}</div> : ""}
              <span className="input-group-text bg-light">
                <i className="bi bi-eye-slash"></i>
              </span>
            </div>
          </div>
          
          {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
          <div className="d-grid gap-2">
            {loading ? <button type='button' className='btn btn-danger m-auto d-block w-100 my-3'><i className="fa-solid fa-spinner fa-spin"></i></button> : <button disabled={!(Login.dirty && Login.isValid)} type="submit" className="btn btn-warning text-white">Sign in</button>}
            <button onClick={()=>{
              navigate('/ForgetPassword')
            }} type="button" className="btn btn-outline-warning text-yellow-500 py-2 px-4 w-full max-w-xs md:max-w-md">Forget Password ...?</button>
          </div>
        </form>
      </div>
    </div>
  );
}