import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [simulateStatus, setSimulateStatus] = useState('1');

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:5000/api/orders', {
      formData,
      productData: state.product,
      simulateStatus
    });
    navigate(`/thank-you/${res.data.orderId}`);
  };

  return (
    <div>
      <h2>Checkout</h2>
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <input name="city" placeholder="City" onChange={handleChange} />
      <input name="state" placeholder="State" onChange={handleChange} />
      <input name="zipCode" placeholder="Zip Code" onChange={handleChange} />
      <input name="cardNumber" placeholder="Card Number" onChange={handleChange} />
      <input name="expiryDate" placeholder="Expiry Date" onChange={handleChange} />
      <input name="cvv" placeholder="CVV" onChange={handleChange} />
      <select onChange={e => setSimulateStatus(e.target.value)}>
        <option value="1">Approved</option>
        <option value="2">Declined</option>
        <option value="3">Gateway Error</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
