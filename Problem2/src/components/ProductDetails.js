// src/components/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const ProductDetails = () => {
  const { categoryname, productid } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [categoryname, productid]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/${categoryname}/products/${productid}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {product.productName}
      </Typography>
      <Typography>Price: ${product.price}</Typography>
      <Typography>Rating: {product.rating}</Typography>
      <Typography>Discount: {product.discount}%</Typography>
      <Typography>Availability: {product.availability}</Typography>
    </Container>
  );
};

export default ProductDetails;
