var express    = require('express');

var path       = require('path');
var bodyParser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views')); // ejs file location
app.set('view engine', 'ejs'); //select view templet engine


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type,token,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');
  next();
});


app.get('/', function(req, res){
    res.render('signup');
})
 
// API
app.use('/user', require('./api/user'));
app.use('/auth', require('./api/auth'));
app.use('/categories', require('./api/categories'));
app.use('/restaurants', require('./api/restaurants'));
app.use('/orderlist', require('./api/orderlist'));
// Server
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });