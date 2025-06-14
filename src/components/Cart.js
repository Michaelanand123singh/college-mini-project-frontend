import React from 'react';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart } = useAuth();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative">
      {/* Cart Icon */}
      <div className="flex items-center">
        <span className="text-2xl">🛒</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </div>

      {/* Cart Dropdown (for future enhancement) */}
      <div className="hidden absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
        <div className="p-4">
          <h3 className="font-semibold mb-3">Cart Items</h3>
          
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              {cart.slice(0, 3).map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">${item.price}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
              
              {cart.length > 3 && (
                <p className="text-xs text-gray-500 mt-2">
                  +{cart.length - 3} more items
                </p>
              )}
              
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total: ${total.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;