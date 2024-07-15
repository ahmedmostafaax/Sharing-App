import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // تأكد من استيراد FontAwesome

export default function YourSubscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    sup()
  }, []);

  let token = localStorage.getItem("token");
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
 

  async function sup(){
    const {data} =await axios.get('https://postbet.ae/plans/mySubscribtions',{ headers: headers })
    setSubscriptions(data.data.data)
    console.log(data.data.data);
  }
// 

  return (
    <div className="container mt-5">
      <h2 className="font-weight-bold">Subscription Plans</h2>
      {error && <p className="text-danger">{error}</p>}
      {subscriptions.length === 0 && !error && <p>Loading subscriptions...</p>}
      {subscriptions.map(subscription => (
        <div key={subscription.id} className="card shadow-sm mt-3">
          <div className="card-body text-center">
            <h5 className="card-title">{subscription.plan.name}</h5>
            <p className="card-text text-muted">Number of posts: {subscription.plan.number_of_posts}</p>
            <p className="card-text text-muted">End Date: {subscription.endSubscriptionDate}</p>
            <div className="d-flex justify-content-center mt-3">

              {subscription.plan.Facebook && <a href="#" className="mx-2"><i className="fab fa-facebook mx-2"></i></a>}
              {subscription.plan.Instagram && <a href="#" className="mx-2"><i className="fab fa-instagram mx-2"></i></a>}
              {subscription.plan.Twitter && <a href="#" className="mx-2"><i className="fab fa-twitter mx-2"></i></a>}
              {subscription.plan.Reddit && <a href="#" className="mx-2"><i className="fab fa-reddit mx-2"></i></a>}
              
              {/* Add other platforms similarly */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
