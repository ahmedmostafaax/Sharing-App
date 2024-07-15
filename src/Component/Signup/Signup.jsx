import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { UserContext } from '../../context/user.context.js';


export default function Signup() {
  let navigate = useNavigate();

  const {setUserEmail} = useContext(UserContext)
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  let basUrl = "https://postbet.ae";

  async function onSubmit(values) {
    setLoading(true);
    setErrorMsg('');

      const { data } = await axios.post(`${basUrl}/Auth/signUp`, values).catch((err)=>{
        setErrorMsg(err.response.data.success);
      });
      if (data.success === true){
        setUserEmail(values.email)
        navigate(`/VeryfyCode`);
      }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Enter a valid email").min(7, "Minimum length is 7"),
    name: Yup.string().required("Name is required").min(3, "Minimum length is 3").max(20, "Maximum length is 20"),
    password: Yup.string().required("Password is required").matches(/^[a-z][a-z0-9]{5,20}$/, "Enter a valid password"),
  });

  let register = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <div className="container mt-5">
      <div className="card p-4 dark:bg-zinc-800">
        <h2 className="text-center text-warning dark:text-yellow-300">Register</h2>
        <p className="text-center text-muted dark:text-zinc-300">
          Create an account to start using postbet
        </p>
        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
        <form onSubmit={register.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-at"></i>
              </span>
              <input onBlur={register.handleBlur} onChange={register.handleChange} type="email" className="form-control" name="email" id="email" placeholder="email" />
              {register.touched.email && register.errors.email ? <p className="text-danger">{register.errors.email}</p> : ""}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-user"></i>
              </span>
              <input onBlur={register.handleBlur} onChange={register.handleChange} type="text" className="form-control" name="name" id="name" placeholder="Name" />
              {register.touched.name && register.errors.name ? <p className="text-danger">{register.errors.name}</p> : ""}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-warning text-white">
                <i className="fa-solid fa-lock"></i>
              </span>
              <input onBlur={register.handleBlur} onChange={register.handleChange} type="password" className="form-control" name="password" id="password" placeholder="password" />
              {register.touched.password && register.errors.password ? <p className="text-danger">{register.errors.password}</p> : ""}
            </div>
          </div>
          <div className="d-grid gap-2">
            {loading ? <button type='button' className='btn btn-yellow m-auto d-block w-100 my-3'><i className="fa-solid fa-spinner fa-spin"></i></button> : <button disabled={!(register.dirty && register.isValid)} type="submit" className="btn btn-warning text-white">Create Account</button>}
            <button type="button" onClick={()=>navigate("/signin")} className="btn btn-outline-warning text-yellow-500 py-2 px-4 w-full max-w-xs md:max-w-md">I Already Have An Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
