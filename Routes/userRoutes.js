const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const userAuth = require('../middlewares/userAuth');
const adminAuth = require('../middlewares/adminAuth'); // Add separate admin auth

// ✅ Register a new user
userRouter.post('/', userController.user);

// ✅ User login
userRouter.post('/login', userController.login);

// ✅ Protected route (For logged-in users)
userRouter.get('/home', userAuth, userController.home);

// ✅ Admin-only route: Get all users
userRouter.get('/all', adminAuth, userController.getAllUsers); 

// ✅ Admin-only route: Block/unblock user
userRouter.patch('/block/:userId', adminAuth, userController.toggleBlockUser);


// ✅ Admin-only route: Get total user count
userRouter.get('/count', adminAuth, userController.getUserCount);


module.exports = userRouter;
