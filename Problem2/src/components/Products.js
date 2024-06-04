import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('Phone');
  const [top, setTop] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, [category, top]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/categories/${category}/products?top=${top}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top {top} Products in {category}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.productName}</Typography>
                <Typography>Price: ${product.price}</Typography>
                <Typography>Rating: {product.rating}</Typography>
                <Typography>Discount: {product.discount}%</Typography>
                <Typography>Availability: {product.availability}</Typography>
                <Button
                  component={Link}
                  to={`/categories/${category}/products/${index}`} // Use index or a unique identifier
                  variant="contained"
                  color="primary"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
