const express = require('express');
const authController = require('../Controllers/authController');
const usersController = require('../Controllers/usersController');
const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.singIn);

router
  .route('/')
  .get(authController.protect, usersController.getAllUsers);
module.exports = router;
