const express = require('express');

const productController = require('../controllers/product.controller');

const router = express.Router();

// Route for similar products
router.get('/:productId/similar', productController.getSimilarProducts);

module.exports = router;