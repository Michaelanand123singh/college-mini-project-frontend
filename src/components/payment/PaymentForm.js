import React, { useState } from 'react';
import { paymentService } from '../../services/paymentService';

const PaymentForm = ({ amount, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await paymentService.createIntent(amount);
      // Simulate payment processing
      setTimeout(() => {
        onSuccess(response.data.paymentIntentId);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Payment failed:', error);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Card Number"
          className="w-full p-2 border rounded mb-2"
        />
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="MM/YY"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="CVC"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
    </div>
  );
};

export default PaymentForm;