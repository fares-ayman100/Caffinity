const jwt = require('jsonwebtoken');
const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

const sendToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });
};

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
};
