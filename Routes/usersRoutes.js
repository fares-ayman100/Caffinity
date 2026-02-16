const express = require('express');
const authController = require('../Controllers/authController');
const usersController = require('../Controllers/usersController');
const router = express.Router();

router.route('/signup').post(authController.signUp);
router.route('/signin').post(authController.singIn);
router.route('/forgotPassword').post(authController.forgotPassword);

router.use(authController.protect);
router.route('/getMe').get(usersController.getMe);

router.route('/updateMe').patch(usersController.updateMe);

router.route('/deleteMe').delete(usersController.deleteMe);
  
router.use(authController.restrictTo('admin'));

router.route('/').get(usersController.getAllUsers);

router
  .route('/:id')
  .get(usersController.getUser)
  .patch(
    usersController.preventUpdatePassword,
    usersController.updateUser,
  )
  .delete(usersController.deleteUser);
      
module.exports = router;
