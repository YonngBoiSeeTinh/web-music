const express = require("express");
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddleWare,authUserMiddleWare } = require("../middleWare/authMiddleware");


router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.put('/update/:id', userController.updateUser);
router.get('/get', userController.getAllUsers);
router.get('/getDetail/:id',authUserMiddleWare, userController.getDetailUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/logout', userController.logout);
router.delete('/delete/:id', authMiddleWare, userController.deleteUser);
module.exports = router;
