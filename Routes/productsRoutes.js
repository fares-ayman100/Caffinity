const express = require('express');
const productsController = require('../Controllers/productsController');
const authController = require('../Controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productsController.addProduct,
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
