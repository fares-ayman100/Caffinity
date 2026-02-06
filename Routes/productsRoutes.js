const express = require('express');
const productsController = require('../Controllers/productsController');
const router = express.Router();

router
  .route('/')
  .get(productsController.getAllProducts)
  .post(productsController.addProduct);

router
  .route('/:id')
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;
