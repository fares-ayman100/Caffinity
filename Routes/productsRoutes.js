const express = require('express');
const productsController = require('../Controllers/productsController');
const authController = require('../Controllers/authController');
const reviewRouter = require('../Routes/reviewsRoutes');
const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productsController.createProduct,
  );

router
  .route('/:id')
  .get(productsController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productsController.updateProduct,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productsController.deleteProduct,
  );

module.exports = router;
