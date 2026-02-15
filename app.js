const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimter = require('express-rate-limit');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const httpStatus = require('./Utils/httpStatus');
const AppError = require('./Utils/appError');
const errorController = require('./Controllers/errorController');
const productsRoutes = require('./Routes/productsRoutes');
const usersRoutes = require('./Routes/usersRoutes');
const reviewsRouter = require('./Routes/reviewsRoutes');

const app = express();

const limiter = rateLimter({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message:
    'Too many requests from this IP, please try again in an hour!.',
});

  // Add Http Security Headers
  app.use(helmet());

  // Global Middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10kb' }));

// Enable extended query parsing so Express can handle nested filters (e.g. price[gte]=3)
app.set('query parser', 'extended');

// Against from NoSql query injection
app.use(ExpressMongoSanitize());

// Prevent parameter pollution
app.use(hpp({whitelist:[
  "category",
  "ratingsQuantity",
  "ratingsAverage"
]}));

// Enable reading cookies from requests
app.use(cookieParser());

app.use('/api', limiter);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: 'API is running',
  });
});

app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRouter);

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
