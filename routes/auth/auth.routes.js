var express = require('express');
var router = express.Router();
const authController = require('../../controllers/auth/auth.controller')


router.post('/login-admin', authController.loginAdmin);


module.exports = router;
