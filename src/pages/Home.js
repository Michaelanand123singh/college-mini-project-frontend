import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../utils/api';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getFeaturedProducts();
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Best Software at Best Prices
          </h1>
          <p className="text-xl mb-8">
            Get licensed software for design, development, security & more
          </p>
          <Link 
            to="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Software Categories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Design', 'Development', 'Security', 'Productivity'].map(category => (
              <div key={category} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Software</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;