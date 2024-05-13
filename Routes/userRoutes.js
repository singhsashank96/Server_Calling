// routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const {protect} = require('../Middleware/AuthmiddleWare')


router.post('/', protect , UserController.addUser);
router.delete('/:userId',protect , UserController.deleteUser);
router.get('/:userId',  UserController.getUserById);
router.get('/', UserController.getAllUsers); 
module.exports = router;
