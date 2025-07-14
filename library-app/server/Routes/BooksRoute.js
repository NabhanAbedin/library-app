const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/BooksController');
const requestsCtrl = require('../Controllers/requestsController')


router.get('/', ctrl.viewBooks);

router.post('/request', requestsCtrl.addBookRequestController);

router.post('/add', ctrl.addBookToCatalog);

router.get('/catalog', ctrl.catalogBooksController)

router.get('/catalog/search', ctrl.viewBooksBySearch);

//router.get('/catalog/filter', ctrl.filterController)

module.exports = router;
