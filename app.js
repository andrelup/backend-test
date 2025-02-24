const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

let queue; // Definir variable para la cola de solicitudes

async function setupQueue() {
  const { default: PQueue } = await import('p-queue');
  queue = new PQueue({ concurrency: 50 });
}

setupQueue().then(() => {
  const app = express();
  const port = 5000;
  const BASE_URL = 'http://localhost:3001';

  app.use(bodyParser.json());
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 1000,
    message: "Demasiadas solicitudes, por favor intenta más tarde."
  });

  app.use(limiter);

  app.get('/product/:productId/similar', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const { data: similarIds } = await axios.get(BASE_URL + '/product/' + productId + '/similarids').catch(() => ({ data: [] }));

      const productDetailsPromises = similarIds.map(id =>
        queue.add(() => axios.get(BASE_URL + '/product/' + id).then(response => response.data).catch(() => null))
      );

      const similarProducts = (await Promise.all(productDetailsPromises)).filter(Boolean);
      res.json(similarProducts);
    } catch (error) {
      next(error);
    }
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({ message: error.message || "Error interno del servidor" });
  });

  app.listen(port, () => {
    console.log('Aggregator API running at http://localhost: ' + port);
  });
});
