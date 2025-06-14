import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">SoftwareStore</h3>
            <p className="text-gray-300 mb-4">
              Your trusted source for premium software licenses at unbeatable prices.
            </p>
            <p className="text-gray-300">
              Instant delivery • Lifetime support • 100% genuine licenses
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white">All Products</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Design Software</span></li>
              <li><span className="text-gray-300">Development Tools</span></li>
              <li><span className="text-gray-300">Security Software</span></li>
              <li><span className="text-gray-300">Productivity Apps</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Email: support@softwarestore.com</span></li>
              <li><span className="text-gray-300">Phone: +1 (555) 123-4567</span></li>
              <li><span className="text-gray-300">24/7 Customer Support</span></li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">
            © 2024 SoftwareStore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-300">Privacy Policy</span>
            <span className="text-gray-300">Terms of Service</span>
            <span className="text-gray-300">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;