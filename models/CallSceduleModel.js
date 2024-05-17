const mongoose = require('mongoose');

const callScheduleSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    index: { expires: '1d' }, // TTL index with a duration of 1 day
    default: Date.now
  }
});


const CallSchedule = mongoose.model('CallSchedule', callScheduleSchema);

module.exports = CallSchedule;
