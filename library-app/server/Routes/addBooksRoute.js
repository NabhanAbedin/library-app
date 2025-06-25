const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/addBooksController');


router.post('/add', ctrl.addBookToCatalog);

module.exports = router;
