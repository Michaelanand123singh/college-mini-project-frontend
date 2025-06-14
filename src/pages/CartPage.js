import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useAuth();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-6xl">🛒</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some software to get started!</p>
          <Link 
            to="/products"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <span>Browse Products</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <span className="text-2xl">🛒</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">💿</span>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description || 'Software License'}</p>
                      <p className="text-blue-600 font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove from cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border sticky top-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cart.length} {cart.length === 1 ? 'item' : 'items'})</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/products"
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
              
              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>🔒</span>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;