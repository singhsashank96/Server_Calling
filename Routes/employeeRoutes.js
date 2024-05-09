const express = require('express');
const {registerUser , loginUser , AllUsers} = require('../controller/employeeController')
const {protect} = require('../Middleware/AuthmiddleWare')
const router = express.Router();

router.route('/').post(registerUser)
 router.post('/login' , loginUser)
 router.get('/' , protect ,  AllUsers)


module.exports = router ;