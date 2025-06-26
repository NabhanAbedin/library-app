const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/BooksController');


router.get('/', ctrl.viewBooks);

router.post('/add', ctrl.addBookToCatalog);

router.get('/catalog', ctrl.viewAllBooksData)

module.exports = router;
