const Review = require('../Models/reviewsModel');
const Order = require('../Models/ordersModel');
const factory = require('./handelrFactory');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');

const setProductAndUser = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getAllReviews = factory.getAllDoc(Review);
const getReview = factory.getDoc(Review);
const checkUserPurchasedProduct = catchAsync(
  async (req, res, next) => {
    const order = await Order.findOne({
      user: req.user._id,
      paymentStatus: 'paid',
      'items.product': req.body.product,
    });
    if (!order) {
      return next(
        new AppError(
          'You can only review a product after ordering it.',
          403,
        ),
      );
    }
    next();
  },
);
const createReview = factory.createDoc(Review);
const updateReview = factory.updateDoc(Review);
const deleteReview = factory.deleteDoc(Review);

module.exports = {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setProductAndUser,
  checkUserPurchasedProduct,
};
