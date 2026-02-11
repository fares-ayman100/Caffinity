const express = require('express');
const authController = require('../Controllers/authController');
const usersController = require('../Controllers/usersController');
const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.singIn);

router
  .route('/updateMe')
  .patch(authController.protect, usersController.updateMe);

router
  .route('/deleteMe')
  .delete(authController.protect, usersController.deleteMe);
  
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    usersController.getAllUsers,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    usersController.getUser,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    usersController.deleteUser,
  );
      
module.exports = router;
