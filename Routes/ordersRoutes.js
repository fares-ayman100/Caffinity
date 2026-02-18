const express = require('express');
const ordersController = require('../Controllers/ordersController');
const authController = require('../Controllers/authController');

const router = express.Router();

router.use(authController.protect);
router
  .route('/checkout-session')
  .post(ordersController.checkoutSession);

router.get('/my-orders', ordersController.getMyOrders);

router.use(authController.restrictTo('admin'));

router.route('/').get(ordersController.getAllOrders);

router
  .route('/:id')
  .get(ordersController.getOneOrder)
  .patch(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

module.exports = router;
