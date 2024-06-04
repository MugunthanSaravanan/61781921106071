import('node-fetch').then(module => {
    const fetch = module.default;
  
    async function generateToken() {
      const authData = {
        companyName: 'Unique',
        clientID: 'ab8e9f79-d40d-4e54-b718-8ba9a0592d8c',
        clientSecret: 'UUBWVadBxuWZWlzN',
        ownerName: 'Mugunthan',
        ownerEmail: 'mugunthansaravanan07@gmail.com',
        rollNo: '71'
      };
  
      try {
        console.log('Sending request to generate token...');
        const response = await fetch('http://20.244.56.144/test/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(authData)
        });
  
        if (!response.ok) {
          console.log('Response status:', response.status);
          console.log('Response status text:', response.statusText);
          const errorText = await response.text();
          console.log('Error response text:', errorText);
          throw new Error('Failed to generate token: ' + response.statusText);
        }
  
        const data = await response.json();
        console.log('Generated token:', data.access_token);
        return data.access_token;
      } catch (error) {
        console.error('Error generating token:', error);
      }
    }
  
    (async () => {
      try {
        const accessToken = await generateToken();
  
        const express = require('express');
        const axios = require('axios');
        const cors = require('cors');
  
        const app = express();
        const PORT = process.env.PORT || 3000;
  
        const clientID = 'ab8e9f79-d40d-4e54-b718-8ba9a0592d8c';
        const clientSecret = 'UUBWVadBxuWZWlzN';
  
        async function getAuthToken(clientID, clientSecret) {
          const authDetails = {
            companyName: "Unique",
            clientID: clientID,
            clientSecret: clientSecret,
            ownerName: "Mugunthan",
            ownerEmail: "mugunthansaravanan07@gmail.com",
            rollNo: "71"
          };
  
          try {
            const response = await axios.post('http://20.244.56.144/test/auth', authDetails);
            return response.data.access_token;
          } catch (error) {
            console.error('Error obtaining the auth token:', error.response? error.response.data : error.message);
          }
        }
  
        app.use(cors());
  
        app.use(async (req, res, next) => {
          if (!accessToken) {
            accessToken = await getAuthToken(clientID, clientSecret);
          }
          next();
        });
  
        app.get('/', (req, res) => {
          res.send('Welcome to the Product API');
        });
  
        app.get('/categories/:categoryname/products', async (req, res) => {
          const { categoryname } = req.params;
          const { top, minPrice, maxPrice, sort, page } = req.query;
  
          const baseUrl = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products`;
  
          const queryParams = new URLSearchParams({
            top: top || 10,
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 1000000,
            sort,
            page
          });
  
          const url = `${baseUrl}?${queryParams.toString()}`;
  
          try {
            const response = await axios.get(url, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
  
            res.json(response.data);
          } catch (error) {
            res.status(error.response? error.response.status : 500).json({
              message: 'Error fetching products',
              details: error.response? error.response.data : error.message
            });
          }
        });
  
        app.get('/categories/:categoryname/products/:productid', async (req, res) => {
          const { categoryname, productid } = req.params;
  
          const url = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products/${productid}`;
  
          try {
            const response = await axios.get(url, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
  
            res.json(response.data);
          } catch (error) {
            res.status(error.response? error.response.status : 500).json({
              message: 'Error fetching product details',
              details: error.response? error.response.data : error.message
            });
          }
        });
  
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
      } catch (error) {
        console.error('Error generating token:', error);
      }
    })();
  });
