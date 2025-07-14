const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/adminController');
const requestsCtrl = require('../Controllers/requestsController')
const {requireAuth} = require('../middleware/authMiddleware');

router.get('/returns', requireAuth, ctrl.getBooksCheckedOutController);

router.put('/returns', requireAuth, ctrl.updateCheckedOutController);

router.get('/requests', requireAuth, requestsCtrl.getAllRequestsController);

router.delete('/requests', requireAuth, requestsCtrl.deleteRequestController);


module.exports = router;