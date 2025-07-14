const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/authorsController');
const requestsCtrl = require('../Controllers/requestsController')

router.post('/add', ctrl.addAuthorController);

router.post('/request', requestsCtrl.addAuthorRequestController);

router.get('/catalog', ctrl.catalogAuthorsController);

router.get('/catalog/search', ctrl.searchAuthorsController);

module.exports = router;