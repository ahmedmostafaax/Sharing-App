import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SubscriptionPlans = () => {

  const nav = useNavigate()
  const BaseUrl = "https://postbet.ae"
  const [plans,setPlans] = useState([])

  useEffect(()=>{
    allPlans()
  },[])

  let token = localStorage.getItem("token");


  async  function allPlans(){

      const {data} = await axios.get(`${BaseUrl}/plans`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      setPlans(data.data.items)
    }


    function plandId(id){
      console.log(id);
    }


  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Subscription plans</h2>
      <div className="row">
      
          {plans.map((elm)=>{
            return <>
            
            <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center" key={elm.id}>
                <h5 className="card-title">{elm.name}</h5>
                <p className="card-text"></p>
                <h2 className="card-price">{elm.price}<span className="text-muted">/mo</span></h2>
                <p className="card-text"><i className="bi bi-check-circle-fill"></i> {elm.number_of_posts}</p>
                <div className="d-flex justify-content-center mb-3">
                  
                {elm.Facebook && <i className="fa-brands fa-facebook mx-2"></i>}
                  {elm.Instagram && <i className="fa-brands fa-instagram mx-2"></i>}
                  {elm.Twitter && <i className="fa-brands fa-twitter mx-2"></i>}
                  {elm.LinkedIn && <i className="fa-brands fa-linkedin mx-2"></i>}
                  {elm.Pinterest && <i className="fa-brands fa-pinterest mx-2"></i>}
                  {elm.Reddit && <i className="fa-brands fa-reddit mx-2"></i>}
                  {elm.Telegram && <i className="fa-brands fa-telegram mx-2"></i>}
                  {elm.TikTok && <i className="fa-brands fa-tiktok mx-2"></i>}

                </div>
                <button className="btn btn-warning" style={{ textDecoration: 'none' }}>
  <Link to={'/Cobon/' + elm.id} className="text-decoration-none text-white">Subscription now</Link>
</button>
              </div>
            </div>
          </div>

            </>
          })}
      
      </div>
    </div>
  );
};

export default SubscriptionPlans;
