import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProduct } from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Product added to cart!');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img 
            src={product.image || '/api/placeholder/500/400'} 
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-blue-600 text-lg mb-4">{product.category}</p>
          <p className="text-4xl font-bold text-green-600 mb-6">${product.price}</p>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">System Requirements</h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Windows 10 or macOS 10.15+</li>
              <li>4GB RAM minimum</li>
              <li>2GB available storage</li>
              <li>Internet connection required</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Lifetime license</li>
              <li>Free updates</li>
              <li>24/7 customer support</li>
              <li>Instant download</li>
            </ul>
          </div>

          <button 
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Add to Cart - ${product.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;