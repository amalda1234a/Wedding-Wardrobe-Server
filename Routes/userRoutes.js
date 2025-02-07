const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/userAuth');

// Route to register a new user (Fixed Route)
userRouter.post('/', userController.user); // Now works as POST /user

// Route to login a user
userRouter.post('/login', userController.login); // Works as POST /user/login

// Protected route to get user data after login
userRouter.get('/home', auth, userController.home); // Works as GET /user/home

module.exports = userRouter;
