const express = require('express');
const authController = require('../Controllers/authController');
const reviewController = require('../Controllers/reviewController');

// tours/121548415/reviews
const router = express.Router({ mergeParams: true });


router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.setProductAndUser,
    reviewController.createReview,
  );

router
  .route('/:id')
  .get(authController.protect, reviewController.getReview)
  .patch(authController.protect, reviewController.updateReview)
  .delete(authController.protect, reviewController.deleteReview);

module.exports = router;
