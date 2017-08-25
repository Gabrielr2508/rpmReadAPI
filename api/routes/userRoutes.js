'use strict';
module.exports = function(app) {

// function
  var user = require('../controllers/userController');

  app.route('/authenticate')
    .post(user.authenticate);

  app.route('/setup')
    .get(user.setup);

  app.route('/users')
    .get(user.list_users);


}
