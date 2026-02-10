const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');


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
  deleteUser,
};
