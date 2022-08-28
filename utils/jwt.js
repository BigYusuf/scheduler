const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin: user.isAdmin,
      profession: user.profession,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};



const isAuth = async(req, res, next) => {

const token = req.cookies['access-token'];
if (token) {
    const validateToken = await jwt.verify(token, process.env.JWT_SECRET) 
        if (err) {
            res.user = validateToken.id;
            next();
        } else {
            res.status(403).send({ message: 'Invalid Token' });
        }
} else {
    res.status(401).send({ message: 'No Token' });
}
};
const isAuth1 =(req, res, next) => {

    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
          if (err) {
            res.status(403).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };
  
  const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  

module.exports= { generateToken, isAuth, isAdmin, isAuth1};