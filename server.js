const express = require('express');
const app = express();
const port = 3001;

// Mock Data
const similarProducts = {
    "1": ["3", "4", "5"],
    "2": ["1", "3"],
    "3": ["2", "5"]
};

const products = {
    "1": { id: "1", name: "Shirt", price: 9.99, availability: true },
    "2": { id: "2", name: "Dress", price: 19.99, availability: true },
    "3": { id: "3", name: "Blazer", price: 29.99, availability: false },
    "4": { id: "4", name: "Boots", price: 39.99, availability: true },
    "5": { id: "5", name: "Jeans", price: 49.99, availability: true }
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