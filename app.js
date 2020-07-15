var express    = require('express');

var path       = require('path');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});


  
// API
app.use('/users', require('./api/users'));
app.use('/auth', require('./api/auth'));

// Server
app.listen(port, function(){
  console.log('listening on port:' + port);
});