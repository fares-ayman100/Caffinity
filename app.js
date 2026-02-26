const express = require('express');
const morgan = require('morgan');
const qs = require('qs');
const path = require('path');
const cookieParser = require('cookie-parser');
const rateLimter = require('express-rate-limit');
const ExpressMongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./doc/swagger');
const httpStatus = require('./Utils/httpStatus');
const AppError = require('./Utils/appError');
const errorController = require('./Controllers/errorController');
const ordersController = require('./Controllers/ordersController');
const productsRouter = require('./Routes/productsRoutes');
const usersRouter = require('./Routes/usersRoutes');
const reviewsRouter = require('./Routes/reviewsRoutes');
const ordersRouter = require('./Routes/ordersRoutes');

const app = express();

// swagger-api
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

// Implement CORS
app.use(cors());

//app.options('*', cors());
app.set('trust proxy', 1);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  ordersController.webhookCheckout,
);

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use((req, res, next) => {
  const url = req.url.split('?')[1];
  if (url) {
    req.query = qs.parse(url);
  }
  next();
});

// Enable extended query parsing so Express can handle nested filters (e.g. price[gte]=3)

//app.set('query parser', 'extended');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Against from NoSql query injection
//app.use(ExpressMongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'category',
      'ratingsQuantity',
      'ratingsAverage',
      'price',
    ],
  }),
);

// Enable reading cookies from requests
app.use(cookieParser());

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: 'API is running',
  });
});

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use('/api/v1/orders', ordersRouter);


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