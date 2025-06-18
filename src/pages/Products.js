import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductList from '../components/product/ProductList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Products = () => {
  const { products, loading } = useProducts();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;