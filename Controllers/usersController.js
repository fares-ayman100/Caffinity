const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');


const filterObj = (obj, ...allawedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allawedField.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: httpStatus.SUCCESS,
    results: users.length,
    data: users,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new AppError('not found the user with that ID.', 404),
    );
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: user,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  // 1) don't pass password in the body
  if (req.body.password) {
    return next(
      new AppError(
        'if you need update your passowrd! go to /updatePassword route',
        400,
      ),
    );
  }
  // 2) filter object
  const filteredObject = filterObj(req.body, 'firstName', 'lastName');

  // 3) update user data

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    filteredObject,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updatedUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });
  res.status(204).json(null);
});

const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(
      new AppError('not found the user with that ID.', 404),
    );
  }
  res.status(204).json(null);
});

module.exports = {
  getAllUsers,
  getUser,
  updateMe,
  deleteMe,
  deleteUser,
};
