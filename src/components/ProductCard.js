import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useAuth();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product.id}`}>
        <img 
          src={product.image || '/api/placeholder/300/200'} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{product.category}</p>
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              ${product.price}
            </span>
            <button 
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;