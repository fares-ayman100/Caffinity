const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const sendEmail = require('../Utils/email');
const { promisify } = require('util');

// 2) HELPER FUNCTIONS (UTILS)
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });

  const cookieOption = {
    maxAge: process.env.JWT_EXPIRED_TOKEN * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production')
    cookieOption.secure = true;

  res.cookie('jwt', token, cookieOption);

  res.status(statusCode).json({
    status: httpStatus.SUCCESS,
    token,
    data: {
      user,
    },
  });
};

// 3) MIDDLEWARES
const protect = catchAsync(async (req, res, next) => {
  // 1) get the token and check if it exit
  let token;
  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError(
        'your are not logged in! Please login to get access',
        401,
      ),
    );
  }

  // 2) verify the token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET,
  );

  // 3) chek if the user is still exit

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exits.',
        401,
      ),
    );
  }
  // 4) chek if the user change password after get a token
  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password! Please login again.',
        401,
      ),
    );
  }
  req.user = currentUser;

  next();
});

const restrictTo = (...roles) => {

  // roles = [user - admin - adminstrator] => role= user
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have permission to do this action.',
          403,
        ),
      );
    }
    next();
  };
};

// 4) CONTROLLERS
const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  // sendEmail({
  //   email: newUser.email,
  //   subject: 'Welcome',
  //   message: 'Welcome in caffinity family',
  // });

  sendToken(newUser, 201, res);
});

const singIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('email and password is required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (
    !user ||
    !(await user.correctPassword(password, user.password))
  ) {
    return next(new AppError('Incorrect email or password', 401));
  }

  sendToken(user, 200, res);
});

module.exports = {
  signUp,
  singIn,
  protect,
  restrictTo,
};
