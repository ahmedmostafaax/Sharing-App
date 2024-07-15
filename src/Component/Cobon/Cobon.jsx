import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Cobon() {
  const {id}=useParams()
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/EnterCode');
  };

  let token = localStorage.getItem("token");

 async function enetrNo(){

  const {data} = await axios.post('https://postbet.ae/plans/subscribe',
    {
      promoCode: "",
      planId: id, 
    
  },
{
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})

console.log(data.success);

if(data.success === true){
     window.location.href = data.data.transactionUrl
}
 }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 text-center" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="card-body">
              <h5 className="card-title font-weight-bold mb-4">Do you have a coupon?</h5>
              <div className="d-flex justify-content-center">
                <button className="btn btn-warning mx-2 px-4 py-2" ><Link to={"/EnterCode/"+id} className="text-decoration-none text-white">yes</Link></button>
                <button className="btn btn-outline-warning mx-2 px-4 py-2" onClick={enetrNo}>No</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
