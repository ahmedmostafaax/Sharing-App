import React from 'react';
import SubscriptionPlans from '../SubscriptionPlans/SubscriptionPlans';

const plansData = [
  {
    "name": "Bronze",
    "details": "Basic plan with limited features",
    "price": 65,
    "number_of_posts": 25,
    "Facebook": true,
    "Instagram": true,
    "Twitter": true,
    "LinkedIn": false,
    "Pinterest": false,
    "Reddit": true,
    "Telegram": false,
    "TikTok": false
  },
  {
    "name": "Silver",
    "details": "Intermediate plan with more features",
    "price": 120,
    "number_of_posts": 30,
    "Facebook": true,
    "Instagram": true,
    "Twitter": true,
    "LinkedIn": true,
    "Pinterest": false,
    "Reddit": true,
    "Telegram": true,
    "TikTok": false
  },
  {
    "name": "Companies",
    "details": "Intermediate plan with more features",
    "price": 500,
    "number_of_posts": 200,
    "Facebook": true,
    "Instagram": true,
    "Twitter": true,
    "LinkedIn": true,
    "Pinterest": false,
    "Reddit": true,
    "Telegram": true,
    "TikTok": true
  },
  {
    "name": "Full package",
    "details": "Intermediate plan with more features",
    "price": 1000,
    "number_of_posts": 1000,
    "Facebook": true,
    "Instagram": true,
    "Twitter": true,
    "LinkedIn": true,
    "Pinterest": true,
    "Reddit": true,
    "Telegram": true,
    "TikTok": true
  },
  // Add more plans as needed
];

const App = () => {
  return (
    <div>
      <SubscriptionPlans plans={plansData} />
    </div>
  );
};

export default App;
