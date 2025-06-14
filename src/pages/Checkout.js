import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../utils/api';

const Checkout = () => {
  const { cart, user, clearCart } = useAuth();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit'
  });
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order = {
        ...orderData,
        items: cart,
        total: total,
        userId: user?.id
      };

      await createOrder(order);
      clearCart();
      alert('Order placed successfully! You will receive download links via email.');
      navigate('/');
    } catch (error) {
      alert('Order failed. Please try again.');
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Billing Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={orderData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={orderData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={orderData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={orderData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={orderData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={orderData.zipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={orderData.paymentMethod}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-600">Qty: {item.quantity}</p>
              </div>
              <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <hr className="my-4" />
          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Digital Delivery:</strong> Download links and license keys will be sent to your email within 5 minutes after payment confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;