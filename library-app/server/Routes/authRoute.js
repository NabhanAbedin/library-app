const express = require('express');
const router = express.Router();
const {register, login, logout, checkLoggedIn } = require('../Controllers/authController');
const {requireAuth} = require('../middleware/authMiddleware');

router.post('/register', register);

router.post('/login',login);

router.post('/logout', requireAuth, logout);

router.get('/check', requireAuth, checkLoggedIn);

module.exports = router;