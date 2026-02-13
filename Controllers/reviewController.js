const Review = require('../Models/reviewsModel');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

const getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId)
    filter = { product: req.params.productId };
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    results: reviews.length,
    data: reviews,
  });
});

const getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new AppError('not found the review with that ID.', 404),
    );
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: review,
  });
});

const createReview = catchAsync(async (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  const review = await Review.create(req.body);
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: review,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: updatedReview,
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) {
    return next(
      new AppError('not found the review with that ID.', 404),
    );
  }
  res.status(204).json(null);
});

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
};
