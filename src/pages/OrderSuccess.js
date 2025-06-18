import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Order Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your order has been confirmed.</p>
      <div className="space-x-4">
        <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded">
          Continue Shopping
        </Link>
        <Link to="/profile" className="bg-gray-600 text-white px-6 py-3 rounded">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
