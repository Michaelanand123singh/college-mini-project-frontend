import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Changed from hooks/useAuth
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { user, logout, loading } = useAuth(); // Using AuthContext
  const { cart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    try {
      await logout(); // Using AuthContext logout method
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  // Show loading state if auth is still loading
  if (loading) {
    return (
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">SoftStore</Link>
          <div className="text-sm">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SoftStore</Link>
        
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
          <input
            type="text"
            placeholder="Search software..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </form>

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative hover:text-blue-200 transition-colors">
            Cart ({cart?.length || 0})
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-blue-200 transition-colors">
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="hover:text-blue-200 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-blue-200 transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-200 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;