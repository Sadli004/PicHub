const jwt = require('jsonwebtoken');
const UserModel = require("../Model/user.model");
module.exports.checkUser =  (req,res,next) => { 
const token = req.cookies.jwt;
if(token){
    jwt.verify(token, process.env.TOKEN_SECRET, async (err,decodedToken) => {
        if(err) { 
            res.locals.user = null;
            res.clearCookie('jwt');
            next();
        }
        else {
            const user = await UserModel.findById(decodedToken.id)
            res.locals.user = user;
            next();
        } 
    })
} else {
    res.locals.user = null;
    next();
  }
}


module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          console.log('user : ',decodedToken.id);
          next();
        }
      });
    } else {
      console.log('No token');
    }
  };