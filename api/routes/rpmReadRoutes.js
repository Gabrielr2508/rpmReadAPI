'use strict';
module.exports = function(app) {
  var rpmReads = require('../controllers/rpmReadController'),
  userHandlers = require('../controllers/userController.js');

  //todoList Routes
  app.route('/reads')
    .get(rpmReads.list_all_reads)
    //.post(userHandlers.loginRequired, rpmReads.create_a_read);
    .post(rpmReads.create_a_read);

  app.route('/reads/:readId')
    .get(rpmReads.read_a_read)
  //  .put(userHandlers.loginRequired, rpmReads.update_a_read)
    .put(rpmReads.update_a_read)
//    .delete(userHandlers.loginRequired, rpmReads.delete_a_read);
    .delete(rpmReads.delete_a_read);

  app.route('/motor/:motorNumber')
    .get(rpmReads.read_motor);

  app.route('/auth/register')
    .post(userHandlers.register);

  app.route('/auth/sign_in')
    .post(userHandlers.sign_in);

};
