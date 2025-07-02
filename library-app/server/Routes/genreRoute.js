const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/genreController');

router.get('/catalog', ctrl.catalogGenreController);

router.get('/catalog/search', ctrl.searchCatalogGenreController);

module.exports = router;