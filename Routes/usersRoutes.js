const express = require('express');
const usersController = require('../Controllers/usersController');
const router = express.Router();

router.route('/signup').post(usersController.signUp);
module.exports = router;
