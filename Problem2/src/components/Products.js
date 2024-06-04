// src/components/Products.js
import React, { useState } from 'react';
import axios from 'axios';
import './Products.css';

function Products() {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [top, setTop] = useState('');
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/${category}/products`, {
        params: {
          top,
          minPrice,
          maxPrice
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchProducts();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Min Price:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Max Price:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Top Products:</label>
          <input type="number" value={top} onChange={(e) => setTop(e.target.value)} required />
        </div>
        <button type="submit">Fetch Products</button>
      </form>
      <div className="product-list">
        {products.map((product) => (
          <div className="product-card" key={product.productName}>
            <h3>{product.productName}</h3>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
