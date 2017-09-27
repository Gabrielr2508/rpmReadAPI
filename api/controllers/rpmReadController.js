'use strict';

var mongoose = require('mongoose'),
  Read = mongoose.model('Reads');

  exports.list_all_reads = function(req, res) {
    Read.find({}, function(err, read) {
      if(err) res.send(err);
      res.json(read);
    });
  };

  exports.create_a_read = function(req, res) {
    var new_read = new Read(req.body);
    new_read.save(function(err, read) {
      if(err) {
        return res.status(422).send({
          message: err
        });
      } else {
        res.json(read);
      }
    });
  };

  exports.read_a_read = function(req, res) {
    Read.findById(req.params.readId, function(err, read) {
      if (err) res.send(err);
      res.json(read);
    });
  };

  exports.read_motor = function(req, res){
    Read.find({motor_number: req.params.motorNumber}, function(err, read){
      if (err) res.send(err);
      res.json(read);
    });
  };

  exports.update_a_read = function(req, res) {
  Read.findOneAndUpdate({_id: req.params.readId}, req.body, {new: true}, function(err, read) {
    if (err)
      res.send(err);
    res.json(read);
  });
};

exports.delete_a_read = function(req, res) {
  Read.remove({
    _id: req.params.readId
  }, function(err, read) {
    if (err)
      res.send(err);
    res.json({ message: 'Read successfully deleted' });
  });
};
