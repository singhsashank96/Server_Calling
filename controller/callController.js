const asyncHandler = require('express-async-handler');
const Call = require('../models/CallModel');

const makeCall = asyncHandler(async (req, res) => {
  const { toCall, feedback, status , userMobile} = req.body;
  const employeeId = req.user._id; // Extract employee ID from request object

  const call = await Call.create({ toCall, status, feedback, employee: employeeId ,userMobile });

  if (call) {
    res.status(201).json({
      status: 'success',
      data: call
    });
  } else {
    res.status(500).json({ status: 'error', message: "Could not make call" });
  }
});

const getCallHistory = asyncHandler(async (req, res) => {
  const { role } = req.user; // Extract role from request object

  let calls;
  if (role === 'admin') {
    calls = await Call.find({});
  } else {
    const employeeId = req.user._id; // Extract employee ID from request object
    calls = await Call.find({ employee: employeeId });
  }

  res.json({ status: 'success', data: calls });
});

const getCallHistoryByStatus = asyncHandler(async (req, res) => {
  const { role } = req.user; // Extract role from request object
  const { status } = req.params; // Extract status from request parameters

  let calls;
  if (role === 'admin') {
    calls = await Call.find({ status });
  } else {
    const employeeId = req.user._id; // Extract employee ID from request object
    calls = await Call.find({ employee: employeeId, status });
  }

  res.json({ status: 'success', data: calls });
});

module.exports = {
  makeCall,
  getCallHistory,
  getCallHistoryByStatus
};
