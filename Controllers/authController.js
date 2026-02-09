const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const { promisify } = require('util');

const sendToken = (id) => {
  console.log('JWT_EXPIRED_IN:', process.env.JWT_EXPIRED_IN);
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });
};

const protect = catchAsync(async (req, res, next) => {
  // 1) get the token and check if it exit
  let token;
  if (
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

const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = sendToken(newUser._id);

  res.status(201).json({
    status: httpStatus.SUCCESS,
    token,
    data: {
      user: newUser,
    },
  });
});

const singIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) chek if email & password is exit
  if (!email || !password) {
    return next(
      new AppError('email and pasword is required', 400),
    );
  }

  // 2) chek if email & password is correct
  const user = await User.findOne({ email }).select('+password');

  if (
    !user ||
    !(await user.correctPassword(password, user.password))
  ) {
    return next(
      new AppError('Incorrect email or password', 401),
    );
  }

  // 3) send token
  const token = sendToken(user._id);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    token,
  });
});

module.exports = {
  signUp,
  singIn,
  protect,
};
