const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_TIME,
    }
  );
};

exports.getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
      res.send(users);    
})

exports.getUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user) {
      res.send(user);
    }else{
      res.status(401).send({ message: 'User Not Found' });
    }
})

exports.loginUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
})

exports.addNewUser = expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      image: createdUser.image,
      role: createdUser.role,
      token: generateToken(user),
    });
})

exports.deleteUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user) {
        const deleteUser = await user.remove(); 
        res.send({ message: 'User Deleted', user: deleteUser });
    }else{
      res.status(404).send({ message: 'User Not Found' })
    }
})

exports.updateUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser),
      });
    }
})

exports.updateAdminUser = expressAsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    
      if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
       
    const updatedUser = await user.save();
    res.send({ message: 'User Updated', user: updatedUser });
    }else{
      res.status(404).send({ message: 'User Not Found' })
    }
})