require('dotenv').config();
const UserModel = require('../Model/user.model');
const jwt = require('jsonwebtoken');
const { signInErrors,signUpErrors } = require('../utils/errors.utils');
// Sign Up
module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body
  
    try {
      const user = await UserModel.create({pseudo, email, password });
      res.status(201).json({ user: user._id});
      console.log('user created');
    }
    catch(err) {
      const errors = signUpErrors(err);
      res.status(200).send( {errors} )
    }
  }
// Token expiresIn : 
const maxAge =  24 * 60 * 60 * 1000; // 1 day


// Sign In   
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const id =  user._id;
    const token = jwt.sign({id}, process.env.TOKEN_SECRET, {
      expiresIn : maxAge
    })    
    
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    let errors = signInErrors();
    res.status(200).json({errors});
  }
}

// Sign Out 
module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
}
