const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/authorsController');

router.post('/add', ctrl.addAuthorController);

router.get('/catalog', ctrl.AuthorsController);

router.get('/catalog/search', ctrl.searchAuthorsController);

module.exports = router;