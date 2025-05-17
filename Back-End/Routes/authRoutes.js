const express = require('express');
const router = express.Router();
const auth = require('../Controllers/Auth');
const protect = require('../Middleware/auth');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);
router.get('/me', protect, auth.getMe);

module.exports = router;
