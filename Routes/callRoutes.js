const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/AuthmiddleWare');
const callController = require('../controller/callController');

router.post('/make-call', protect, callController.makeCall);
router.get('/call-history', protect, callController.getCallHistory);

module.exports = router;