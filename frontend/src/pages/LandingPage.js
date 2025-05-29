import React from 'react';
import { useNavigate } from 'react-router-dom';

const product = {
  title: "Product Sample",
  description: "Classic high-top sneakers.",
  price: 75,
};

export default function LandingPage() {
  const navigate = useNavigate();
  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
