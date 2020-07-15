var jwt = require('jsonwebtoken');

var util = {};

util.successTrue = function(data,message){
  return {
    success:true,
    message:message,
    errors:null,
    data:data
  };
};

util.successFalse = function(err, message){
  if(!err&&!message) message = 'data not found';
  return {
    success:false,
    message:message,
    errors:(err)? err.stack: null,
    data:null
  };
};




// middlewares
util.isLoggedin = function(req,res,next){
  var token = req.headers['x-access-token'];
  if (!token) return res.json(util.successFalse(null,'token is required!'));
  else {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) return res.json(util.successFalse(err));
      else{
        req.decoded = decoded;
        next();
      }
    });
  }
};

module.exports = util;
