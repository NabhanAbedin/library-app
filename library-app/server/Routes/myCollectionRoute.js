const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const ctrl = require('../Controllers/myCollectionController')


router.get('/cart', requireAuth, ctrl.getUserCartController);

router.post('/cart',requireAuth, ctrl.addToCartController);

router.delete('/cart', requireAuth, ctrl.removeFromCartController);

router.post('/checkedout', requireAuth, ctrl.addToCheckedOutController);

router.get('/checkedout', requireAuth, ctrl.getCheckedOutController);

module.exports = router;
