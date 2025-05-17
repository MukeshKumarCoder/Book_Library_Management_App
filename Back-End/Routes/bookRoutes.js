const express = require('express');
const router = express.Router();
const { getAllBooks } = require('../Controllers/bookController');

router.get('/', getAllBooks);

module.exports = router;
