const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { generateToken } = require('../utils/jwt');
const { sendMail, sendResetMail, sendEmail1 } = require('../utils/Emails');
const cron = require('node-cron');


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
      const token = generateToken(user)
      // store token in cookie
      res.cookie('access-token', token)
      res.send({
        user,
        token: token,
      });
      return;
    }
  }
  res.status(401).send({ message: 'Invalid email or password' });
})

exports.logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie('access-token', '', {maxAge: 1})
})

exports.addNewUser = expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      emailToken: crypto.randomBytes(64).toString('hex'),
      isVerified: false,
    });
    const createdUser = await user.save();
    sendMail( req, createdUser,createdUser.email, createdUser.name).then(result => console.log("Verification Email Sent ", result))
    res.send({
      createdUser,
      token: generateToken(user),
    });
  })
  
  exports.verifyEmail = expressAsyncHandler(async (req, res) => {
    try {
      const token = req.query.token
      const user = await User.findOne({ emailToken: token });
      if(user){
        user.emailToken = null
        user.isVerified = true
        await user.save()
        res.send('email has been verified successfully')
      }else{
        res.send('email is not verified')
      }
    } catch (err) {
      console.log(err)
    }
  })
  
  exports.forgotPassword = expressAsyncHandler(async (req, res) => {
    
    const user = await User.findOne({ email: req.body.email });
    const token = crypto.randomBytes(64).toString('hex')
    
    if (user) {
      user.resetpasswordToken = crypto.createHash('sha256').update(token).digest('hex')
      await user.save()
      sendResetMail( req, user,user.email, user.name).then(result => console.log("Password Reset Email Sent ", result))
      res.send(
        'password reset link has been sent to your email'
        );
        return;
      }
    res.status(404).send({ message: 'Invalid email' });
})

  exports.resetPassword = expressAsyncHandler(async (req, res) => {
    try {
      const token = req.params.token
      const user = await User.findOne({ resetpasswordToken: token });

      if(req.body.password !== req.body.confirmPassword){
        res.status(400).json('Password does not match')
      }
      user.password= bcrypt.hashSync(req.body.password, 8);
      user.resetpasswordToken = null
      await user.save()
      res.status(200).send('Password reset successfully');
      } catch (err) {
        console.log(err)
    }
        
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
    
    if(user && !req.body.email1.fromTodayDay) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      user.email1.status = req.body.email1.status || user.email1.status;
      
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    }
    else if(user && req.body.email1.fromTodayDay){
      user.email1.fromTodayDay = req.body.email1.fromTodayDay || user.email1.fromTodayDay;
      var someDate = new Date();
      var numberOfDaysToAdd = req.body.email1.fromTodayDay;
      var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
      user.email1.emailSendDate = new Date(result);
      user.email1.status = 'pending';
      const updatedUser = await user.save();
      var dd =new Date(result).getDate()// added date
      var mm =new Date(result).getMonth()// added date
      if(user.email1.status==='pending' || !user.email1.status || user.email1.status===''){ 
       // var h=11 //testing data hour
       // var m=50 //testing data minutes
       //  cron.schedule(`${m} ${h} * * *`, () => { //testing
       cron.schedule(`* * ${dd} ${mm} *`, () => {
        sendEmail1( req, updatedUser, updatedUser.email, updatedUser.name).then(result => console.log("Promotional Email(1st email) Sent ", result))
        user.email1.status = 'sent';
        const updatedUser1 = user.save();
        res.send({ message: 'User email1 status updated', user: updatedUser1 });
      });}
      res.send({ message: 'User email1 send date updated', user: updatedUser });
    }
    else{
      res.status(404).send({ message: 'User Not Found' })
    }
})