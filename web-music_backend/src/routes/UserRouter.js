const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update/:id', userController.updateUser);
router.get('/get', userController.getAllUsers);
router.delete('/delete/:id', userController.deleteUser);
module.exports = router;
