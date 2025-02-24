const express = require('express');
const app = express();
const port = 3001;

// Mock Data from mocks.json
const similarProducts = {
    "1": ["2", "3", "4"],
    "2": ["3", "100", "1000"],
    "3": ["100", "1000", "10000"],
    "4": ["1", "2", "5"],
    "5": ["1", "2", "6"]
};

const products = {
    "1": { "id": "1", "name": "Shirt", "price": 9.99, "availability": true },
    "2": { "id": "2", "name": "Dress", "price": 19.99, "availability": true },
    "3": { "id": "3", "name": "Blazer", "price": 29.99, "availability": false },
    "4": { "id": "4", "name": "Boots", "price": 39.99, "availability": true },
    "100": { "id": "100", "name": "Trousers", "price": 49.99, "availability": false },
    "1000": { "id": "1000", "name": "Coat", "price": 89.99, "availability": true },
    "10000": { "id": "10000", "name": "Leather jacket", "price": 89.99, "availability": true }
};

// Endpoint 1: Obtener IDs de productos similares
app.get('/product/:productId/similarids', (req, res) => {
    const { productId } = req.params;
    res.json(similarProducts[productId] || []);
});

// Endpoint 2: Obtener detalles del producto
app.get('/product/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products[productId];
    if (!product) {
        return res.status(404).json({ error: "Product Not Found" });
    }
    res.json(product);
});

app.listen(port, () => {
    console.log('Mock Data API running at http://localhost:'+port);
});