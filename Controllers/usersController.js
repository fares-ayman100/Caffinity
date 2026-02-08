const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');


const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: httpStatus.SUCCESS,
    results: users.length,
    data: users,
  });
});

module.exports = {
  getAllUsers,
};
