const AppError = require('../Utils/appError');

handelCastErrorDB = (err) => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new AppError(message, 400);
};

handelDublicatErrorDB = (err) => {
  const message = `Dublicate field value :(${err.keyValue['name']}). Please use another value`;
  return new AppError(message, 400);
};
handelValidatorErrorDB = (err) => {
  const errors = Object.values(err.errors).map(
    (el) => el.message,
  );
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 404);
};

sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

sendProdError = (err, res) => {
  // Operational Error or trust error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programming Error or other error : don't send details to client
  else {
    console.error('Error💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message;

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (error.name === 'CastError') {
      error = handelCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handelDublicatErrorDB(error);
    }
    if (error.name === 'ValidationError') {
      error = handelValidatorErrorDB(error);
    }
    sendProdError(error, res);
  }
};
