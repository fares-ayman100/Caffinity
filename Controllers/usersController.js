const User = require('../Models/userModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const factory = require('./handelrFactory');
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

const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
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

const getAllUsers = factory.getAllDoc(User);
const getUser = factory.getDoc(User);
// Not Update User Password
const preventUpdatePassword=(req,res,next)=>{

  if (req.body.password) {
    return next(
      new AppError('Password cannot be updated through this route.', 400)
    );
  }
  next();
}
const updateUser = factory.updateDoc(User);
const deleteUser = factory.deleteDoc(User);

module.exports = {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  preventUpdatePassword,
};
