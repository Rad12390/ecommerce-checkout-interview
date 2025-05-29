import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ThankYouPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${orderId}`)
      .then(res => setOrder(res.data));
  }, [orderId]);

  return (
    <div>
      <h2>Thank You</h2>
      {order && (
        <>
          <p>Order ID: {order.orderId}</p>
          <p>Status: {order.transactionStatus}</p>
          <p>Name: {order.fullName}</p>
        </>
      )}
    </div>
  );
}
