'use strict';

var jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  config = require('../../config'),
  mongoose = require('mongoose'),
  User = mongoose.model('Users');

// exports.authenticate = function(req, res) {
//     User.findOne({
//       name: req.body.name
//     }, function(err, user) {
//       if (err) res.send(err);
//
//       if (!user) res.json({ success: false, message: 'User not found.'});
//       else if (user){
//
//         if (user.password != req.body.password) res.json({ success: false, message: 'Authentication failed.' });
//
//         else {
//           console.log(config.secret)
//           var token = jwt.sign(user, config.secret, {
//             expiresIn: '1d'
//           });
//
//           res.json({
//             success: true,
//             message: 'Enjoy!',
//             token: token
//           });
//         }
//       }
//     });
//   };

exports.register = function(req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user){
    if (err) {
      return res.status(400).send({
          message: err
      });
    } else {
        user.hash_password = undefined;
        return res.json(user);
    }
  });
};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'User not found.'});
    }
    else if (user) {
      if (!user.comparePassword(req.body.password)){
        res.status(401).json({ message: 'Wrong password.'});
      }
      else {
        return res.json({token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id}, config.secret)});
      }
    }
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

// exports.setup = function(req, res) {
//       // create a sample user
//       var nick = new User({
//         name: 'Nick Cerminara',
//         password: 'password'
//       });
//
//       // save the sample user
//       nick.save(function(err) {
//         if (err) throw err;
//
//         console.log('User saved successfully');
//         res.json({ success: true });
//       });
//     };
//
// exports.list_users = function(req, res) {
//   User.find({}, function(err, users) {
//     res.json(users);
//   });
// };
