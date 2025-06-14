import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, cart, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            SoftwareStore
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/products" className="hover:text-blue-200">Products</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-blue-200">
              Cart ({cart.length})
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span>Hi, {user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800">
                  Login
                </Link>
                <Link to="/register" className="bg-green-600 px-3 py-1 rounded hover:bg-green-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;