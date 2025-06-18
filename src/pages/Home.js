import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/product/ProductList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const { products, loading } = useProducts();

  if (loading) return <LoadingSpinner />;

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to SoftStore</h1>
        <p className="text-xl text-gray-600">Your one-stop shop for software solutions</p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <ProductList products={featuredProducts} />
      </section>

      <div className="text-center">
        <Link to="/products" className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg">
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default Home;