import { apiService } from './api';

export const productService = {
  // Get all products with optional filters
  getAll: (params = {}) => apiService.products.getAll(params),
  
  // Get product by ID
  getById: (id) => apiService.products.getById(id),
  
  // Search products
  search: (query, filters = {}) => apiService.products.search({ q: query, ...filters }),
  
  // Create product (Admin only)
  create: (productData) => apiService.products.create(productData),
  
  // Update product (Admin only)
  update: (id, productData) => apiService.products.update(id, productData),
  
  // Delete product (Admin only)
  delete: (id) => apiService.products.delete(id),
  
  // Add review to product
  addReview: (productId, reviewData) => apiService.products.addReview(productId, reviewData),
  
  // Get product categories (if you have categories)
  getCategories: () => apiService.products.getCategories?.() || Promise.resolve([]),
  
  // Get featured products
  getFeatured: () => apiService.products.getAll({ featured: true }),
  
  // Get products by category
  getByCategory: (category) => apiService.products.getAll({ category })
};

export default productService;