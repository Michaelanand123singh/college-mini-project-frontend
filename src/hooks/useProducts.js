import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAll();
        
        // Extract products from the response structure
        const productsData = response.data.products || [];
        setProducts(productsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};