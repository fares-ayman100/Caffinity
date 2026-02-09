const express = require('express');
const productsController = require('../Controllers/productsController');
const authController = require('../Controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, productsController.getAllProducts)
  .post(productsController.addProduct);

router
  .route('/:id')
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
