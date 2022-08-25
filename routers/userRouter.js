
const express = require('express');
const { addNewUser, getUser, getAllUsers, deleteUser, updateUser, updateAdminUser, loginUser } = require('../controllers/userController');

const userRouter = express.Router();

// user login
userRouter.post('/login', loginUser);

// register new user
userRouter.post('/register', addNewUser);

//get single user
userRouter.get('/:id', getUser);

// update user
userRouter.put('/profile', updateUser);

//get all users
userRouter.get('/', getAllUsers);

// delete user
userRouter.delete('/:id', deleteUser);

// update user
userRouter.put('/:id', updateAdminUser);

module.exports = userRouter;