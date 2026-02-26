const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Email = require('../Utils/email');
const { promisify } = require('util');

// 2) HELPER FUNCTIONS (UTILS)
const sendToken = (user, statusCode, req, res, sendUser = true) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN,
  });

  const cookieOption = {
    maxAge: process.env.JWT_EXPIRED_TOKEN * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure:
      req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none',
  };

  res.cookie('jwt', token, cookieOption);

  user.password = undefined;

  const response = {
    status: httpStatus.SUCCESS,
    token,
  };

  if (sendUser) response.data = { user };

  res.status(statusCode).json(response);
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

  if (!token || token === 'loggedout') {
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

  const url = `${req.protocol}://${req.get('host')}/account`;
  await new Email(newUser, url).sendWelcome();

  sendToken(newUser, 201, req, res);
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

  sendToken(user, 200, req, res, false);
});

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure:
      req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none',
  });

  res.status(200).json({ status: httpStatus.SUCCESS });
};

const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) get user by email

  if (!req.body || !req.body.email) {
    return next(new AppError('Please provide your email', 400));
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new AppError('There is no user with email address', 404),
    );
  }

  // 2) generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    await new Email(user, resetURL).sendResetPassword();
    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: 'Token sent to email',
    });
  } catch (err) {
    ((user.passwordResetToken = undefined),
      (user.passwordResetExpired = undefined));

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending email ,Try agin later!',
        500,
      ),
    );
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  // 1) get the user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpired: { $gt: Date.now() },
  });
  // 2) check if token is not expired and the user found set new password

  if (!user) {
    return next(
      new AppError('Invalid token or token is expired', 404),
    );
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpired = undefined;
  await user.save();

  // 3) set the new changePasswordAt
  // 4) log the user in and send jwt
  sendToken(user, 200, req, res, false);
});

module.exports = {
  signUp,
  singIn,
  logout,
  forgotPassword,
  resetPassword,
  protect,
  restrictTo,
};
