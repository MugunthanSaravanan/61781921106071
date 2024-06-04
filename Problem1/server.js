const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

const clientID = 'ab8e9f79-d40d-4e54-b718-8ba9a0592d8c';
const clientSecret = 'UUBWVadBxuWZWlzN';
let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3NTA3MTMxLCJpYXQiOjE3MTc1MDY4MzEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFiOGU5Zjc5LWQ0MGQtNGU1NC1iNzE4LThiYTlhMDU5MmQ4YyIsInN1YiI6Im11Z3VudGhhbnNhcmF2YW5hbjA3QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IlVuaXF1ZSIsImNsaWVudElEIjoiYWI4ZTlmNzktZDQwZC00ZTU0LWI3MTgtOGJhOWEwNTkyZDhjIiwiY2xpZW50U2VjcmV0IjoiVVVCV1ZhZEJ4dVdaV2x6TiIsIm93bmVyTmFtZSI6Ik11Z3VudGhhbiIsIm93bmVyRW1haWwiOiJtdWd1bnRoYW5zYXJhdmFuYW4wN0BnbWFpbC5jb20iLCJyb2xsTm8iOiI3MSJ9.q-uWPUgCuqnIoRgpvqvEZ5IiF3OA3ePwVFlETixSWYA';

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
        console.error('Error obtaining the auth token:', error.response ? error.response.data : error.message);
    }
}

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
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error fetching products',
            details: error.response ? error.response.data : error.message
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
        res.status(error.response ? error.response.status : 500).json({
            message: 'Error fetching product details',
            details: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
