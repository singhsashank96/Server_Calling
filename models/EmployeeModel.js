const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // Assuming email should be unique for each employee
  },
  password: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8F_iFBaIYpSvJ53k-qlO4HOHwkAV-81t3L3WDMLiWsg&s"
  } // Picture is not required
});

employeeSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next(); // Skip hashing if the password is not modified
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
