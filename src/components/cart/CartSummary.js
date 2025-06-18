import React from 'react';

const CartSummary = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <div className="flex justify-between mb-2">
        <span>Items: {cart.length}</span>
      </div>
      <div className="flex justify-between font-bold text-xl">
        <span>Total: ${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;