// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/', UserController.addUser);
router.delete('/:userId', UserController.deleteUser);
router.get('/:userId', UserController.getUserById);
router.get('/', UserController.getAllUsers); 
module.exports = router;
