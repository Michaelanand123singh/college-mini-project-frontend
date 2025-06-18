import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/orderService';
import PaymentForm from '../components/payment/PaymentForm';
import CartSummary from '../components/cart/CartSummary';

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      await orderService.create({
        items: cart,
        shippingInfo,
        paymentIntentId,
        total
      });
      navigate('/order-success');
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={shippingInfo.zipCode}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={shippingInfo.country}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <PaymentForm amount={total} onSuccess={handlePaymentSuccess} />
        </div>
        <div>
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;