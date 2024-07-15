import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const EnterCode = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // const validationSchema = Yup.object({
  //   code: Yup.string()
  //     .required('')
  //     .matches(/^[A-Z][a-z0-9]{5,20}$/, 'Enter a valid password'),
  // });

  const formik = useFormik({
    initialValues: {
      code: '',
    },
    // validationSchema,
    onSubmit
  });

  const token = localStorage.getItem("token")

  async function onSubmit(val){
    console.log(val.code);
      const {data} = await axios.get(`https://postbet.ae/promocode/checkPromoCode/${val.code}/${id}`)

      if(data.success == true){

        const {data} = await axios.post('https://postbet.ae/plans/subscribe',
          {
            promoCode: val.code,
            planId: id, 
          
        },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      }
    
  }

  return (
    <div className="container mt-5">
      <h2 className="text-warning">Enter Coupon Code</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="password" className="font-weight-bold">
            Enter Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            className="form-control"
            placeholder="*******"
            {...formik.getFieldProps('code')}
          />
          {formik.touched.code && formik.errors.code ? (
            <div className="text-danger">{formik.errors.code}</div>
          ) : null}
        </div>
        <button disabled={!(formik.dirty && formik.isValid)} type="submit" className="btn btn-warning mx-2">
          Done
        </button>
      </form>
    </div>
  );
};

export default EnterCode;

