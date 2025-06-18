import React from 'react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h4 className="font-semibold">{item.product.name}</h4>
          <p className="text-gray-600">${item.product.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="mx-4">Qty: {item.quantity}</span>
        <button
          onClick={() => removeFromCart(item.product._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;