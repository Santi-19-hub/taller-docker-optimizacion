require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const cors = require('cors');

const app = express();
app.use(cors());


app.use('/customers', createProxyMiddleware({
    target: process.env.CUSTOMERS_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/customers/' },
}));

app.use('/products', createProxyMiddleware({
    target: process.env.PRODUCTS_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/products/' },
}));

app.use('/orders', createProxyMiddleware({
    target: process.env.SHOPPING_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/orders/' },
}));


app.get('/', (req, res) => {
    res.send('API Gateway is running');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚪 Gateway running on port ${PORT}`);
});