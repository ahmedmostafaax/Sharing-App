import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Cobons/Cobons.css'; // تأكد من وجود ملف CSS لتحسين الأنماط

export default function Cobons() {
  const [coupons, setCoupons] = useState([]);
  const API_KEY = 'TH8S6RT-67ZMT2F-HTB3ZSH-PFEAPER';

  let token = localStorage.getItem("token");
  useEffect(() => {
    promo();
  }, []);
  async function promo() {
    const  headers = {
      headers: {
        'Content-Type': `application/json`,
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get('https://postbet.ae/promocode', headers);
    console.log("API Response:", response.data);
    setCoupons(response.data.data.items); // تأكد من المسار الصحيح للبيانات
  }

  return (
    <div className="cobons-container">
      {coupons.length > 0 ? (
        coupons.map((coupon, index) => (
          <div key={index} className="card text-center shadow-sm p-3 mb-5 bg-white rounded cobons-card">
            <div className="card-body">
              <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto cobons-circle">
                <span>{coupon.percentage}% خصم</span> {/* التأكد من استخدام الحقل الصحيح */}
              </div>
              <p className="card-text mt-3">تاريخ الانتهاء {new Date(coupon.expirationDate).toLocaleDateString()}</p>
              <button className="btn btn-outline-dark mt-2">{coupon.promoCode}</button> {/* التأكد من استخدام الحقل الصحيح */}
            </div>
          </div>
        ))
      ) : (
        <p>No coupons available</p>
      )}
    </div>
  );
}
