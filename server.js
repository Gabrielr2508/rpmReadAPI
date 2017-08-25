var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Read = require('./api/models/rpmReadModel'), //created model loading here
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),

  morgan = require('morgan'),
  jwt = require('jsonwebtoken'),
  config = require('./config');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

//app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(function(req, res, next){
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  }
  else {
    req.user = undefined;
    next();
  }
});


var routes = require('./api/routes/rpmReadRoutes'); //importing route
//var routes2 = require('./api/routes/userRoutes')

routes(app); //register the route
//routes2(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('RPM read RESTful API server started on: ' + port);
