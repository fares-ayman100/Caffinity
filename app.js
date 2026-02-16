const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimter = require('express-rate-limit');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger');

const httpStatus = require('./Utils/httpStatus');
const AppError = require('./Utils/appError');
const errorController = require('./Controllers/errorController');

const productsRoutes = require('./Routes/productsRoutes');
const usersRoutes = require('./Routes/usersRoutes');
const reviewsRouter = require('./Routes/reviewsRoutes');

const app = express();

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('✅ Connection Successful'))
  .catch((err) => console.error(err));

/* =========================
   SECURITY
========================= */
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

/* =========================
   RATE LIMITER
========================= */
const limiter = rateLimter({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  message:
    'Too many requests from this IP, please try again in an hour!.',
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* =========================
   GLOBAL MIDDLEWARE
========================= */
app.use(express.json({ limit: '10kb' }));
app.set('query parser', 'extended');
app.use(ExpressMongoSanitize());

app.use(
  hpp({
    whitelist: ['category', 'ratingsQuantity', 'ratingsAverage'],
  }),
);

app.use(cookieParser());
app.use('/api', limiter);

/* =========================
   ROUTES
========================= */
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: 'API is running',
  });
});

/* Swagger Docs */
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.min.js',
    ],
  }),
);


app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRouter);

/* =========================
   ERROR HANDLING
========================= */
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
