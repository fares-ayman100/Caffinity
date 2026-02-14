const Review = require('../Models/reviewsModel');
const factory = require('./handelrFactory');

const setProductAndUser = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const getAllReviews = factory.getAllDoc(Review);
const getReview = factory.getDoc(Review);
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
};
