'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReadSchema = new Schema({
  motor_number: {
    type: Number,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  rpm_optico: {
    type: Number,
    required: true
  },
  rpm_indutivo: {
    type: Number,
    required: true
  },
  voltage: {
    type: Number,
    required: true
  }
  // status: {
  //   type: [{
  //     type: String,
  //     enum: ['pending', 'ongoing', 'completed']
  //   }],
  //   default: ['pending']
  // }
});

module.exports = mongoose.model('Reads', ReadSchema);
