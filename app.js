const express = require('express');
const morgan = require('morgan');
const httpStatus = require('./Utils/httpStatus');
const productsRoutes = require('./Routes/productsRoutes');
const AppError = require('./Utils/appError');
const errorController = require('./Controllers/errorController');

const app = express();

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// Enable extended query parsing so Express can handle nested filters (e.g. price[gte]=3)
app.set('query parser', 'extended');

app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: 'API is running',
  });
});

app.use('/api/v1/products', productsRoutes);

app.use('/', (req, res, next) => {
  next(
    new AppError(
      `We can’t find ${req.originalUrl} on this server!`,
      404,
    ),
  );
});

app.use(errorController);

module.exports = app;
