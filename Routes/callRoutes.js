const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/AuthmiddleWare');
const callController = require('../controller/callController');

router.post('/make-call', protect, callController.makeCall);
router.get('/call-history', protect, callController.getCallHistory);
router.get('/call-history/:status', protect, callController.getCallHistoryByStatus); // New route for fetching call history by status

module.exports = router;
