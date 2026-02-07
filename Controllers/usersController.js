const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: {
      user: newUser,
    },
  });
});
module.exports = {
  signUp,
};
