import React from 'react';

const ProductFilter = ({ onFilter }) => {
  const categories = ['All', 'Development', 'Design', 'Productivity', 'Security'];
  const priceRanges = [
    { label: 'All Prices', value: '' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200+' }
  ];

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <h3 className="font-semibold mb-4">Filters</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          onChange={(e) => onFilter('category', e.target.value)}
          className="w-full p-2 border rounded"
        >
          {categories.map(category => (
            <option key={category} value={category === 'All' ? '' : category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price Range</label>
        <select
          onChange={(e) => onFilter('price', e.target.value)}
          className="w-full p-2 border rounded"
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          onChange={(e) => onFilter('sort', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;