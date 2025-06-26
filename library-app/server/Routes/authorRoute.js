const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/authorsController');

router.post('/add', ctrl.addAuthorController);


module.exports = router;