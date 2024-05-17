const asyncHandler = require('express-async-handler');
const Call = require('../models/CallModel');
const CallSchedule = require('../models/CallSceduleModel');

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

const getCallHistoryWithPagination = asyncHandler(async (req, res) => {
  const { role } = req.user; // Extract role from request object
  const page = parseInt(req.query.page) || 1; // Extract page number from query parameters
  const limit = 10; // Number of calls per page

  let calls;
  let totalCalls;

  if (role === 'admin') {
    // For admin, get all calls
    calls = await Call.find({})
      .skip((page - 1) * limit) // Skip calls based on the page number
      .limit(limit); // Limit the number of calls per page
    totalCalls = await Call.countDocuments(); // Get total number of calls
  } else {
    const employeeId = req.user._id; // Extract employee ID from request object
    calls = await Call.find({ employee: employeeId })
      .skip((page - 1) * limit) // Skip calls based on the page number
      .limit(limit); // Limit the number of calls per page
    totalCalls = await Call.countDocuments({ employee: employeeId }); // Get total number of calls for the employee
  }

  const totalPages = Math.ceil(totalCalls / limit); // Calculate total number of pages

  res.json({
    status: 'success',
    data: calls,
    totalPages,
    currentPage: page
  });
});

const scheduleCall = async (req, res) => {
  try {
    const { employeeId, users } = req.body; // Extract employeeId and users from request body
    // You may need to validate 'employeeId' to ensure it's a valid employee ID

    // Check if there is an existing call schedule for the employee
    let existingCallSchedule = await CallSchedule.findOne({ employee: employeeId });

    if (existingCallSchedule) {
      // If there is an existing call schedule, update it by adding the new users
      existingCallSchedule.users.push(...users);
      await existingCallSchedule.save();
      res.status(200).json({ message: 'Call updated successfully', data: existingCallSchedule });
    } else {
      // If there is no existing call schedule, create a new one
      const newCallSchedule = new CallSchedule({
        employee: employeeId,
        users: users
      });
      await newCallSchedule.save();
      res.status(201).json({ message: 'Call scheduled successfully', data: newCallSchedule });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




const getEmployeeCalls = async (req, res) => {
  try {
    const { employeeId } = req.params; // Extract employee ID from request parameters

    // Retrieve call schedules for the specified employee only
    const calls = await CallSchedule.find({ employee: employeeId }).populate('users');
    res.status(200).json({ message: 'Call schedules retrieved successfully', data: calls });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getAllCalls = async (req, res) => {
  try {
    // Retrieve all call schedules and populate the 'employee' field with employee details
    const calls = await CallSchedule.find().populate({ 
      path: 'employee', 
      select: 'name' // Specify the fields to select from the 'Employee' collection (only 'name' in this case)
    }).populate('users');
    
    res.status(200).json({ message: 'All call schedules retrieved successfully', data: calls });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




module.exports = {
  makeCall,
  getCallHistory,
  getCallHistoryByStatus,
  getCallHistoryWithPagination , 
  scheduleCall , 
  getEmployeeCalls ,
  getAllCalls
};
