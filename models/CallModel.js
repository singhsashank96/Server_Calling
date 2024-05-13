const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  toCall: {
    type: String,
    required: true
  },
  userMobile: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  feedback: {
    type: String,
   
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Call = mongoose.model('Call', callSchema);

module.exports = Call;
