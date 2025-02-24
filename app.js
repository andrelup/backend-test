const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const BASE_URL = 'http://localhost:3001';

app.use(bodyParser.json()); // application/json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Endpoint único: Obtener productos similares con detalles
app.get('/product/:productId/similar', async (req, res,next) => {
    const { productId } = req.params;
    try {
        // Obtener los IDs de productos similares
        const { data: similarIds } = await axios.get(BASE_URL+'/product/'+productId+'/similarids');
        
        // Obtener los detalles de cada producto similar
        const productDetailsPromises = similarIds.map(id =>
            axios.get(BASE_URL+'/product/'+id).then(response =>  response.data )
        );
        
        const similarProducts = (await Promise.all(productDetailsPromises)).filter(Boolean);
        res.json(similarProducts);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }
});


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  });  

app.listen(port, () => {
    console.log('Aggregator API running at http://localhost:'+port);
});
